<script lang="ts">
    import { onMount } from 'svelte';
    import Viewer from './Viewer.svelte'
    import Settings from './Settings.svelte'
    import { getFileList } from './api/api'
    import type { IFileList } from './api/api'
    import { config } from './config'
    import { getSettings } from './settings_util'
    // export let path: string
    export let location: any
    let viewerOpen: boolean = false
    let viewerIndex: number

    let settingsOpen: boolean = false
    let settings = getSettings()

    const handleOnSettingsChanged = (name, value) => {
        settings = {
            ...settings,
            [name]: value
        }
        localStorage.setItem("settings", JSON.stringify(settings))
    }
    // let filelist = Promise.resolve({});

    let path = location?.pathname || "/"

    let filelist: IFileList = { Dirs: [], Files: []} //getFileList(path)

    $: console.log(location)
    $: console.log(path)

    let filePaths: Array<string>
    $: filePaths = filelist.Files.map(file => `${config.staticRoot}${path}${file}`)

    // It's recommended to put the fetch in onMount rather than at the top level of the <script> because of server-side rendering (SSR). With the exception of onDestroy, lifecycle functions don't run during SSR, which means we can avoid fetching data that should be loaded lazily once the component has been mounted in the DOM.
    // getFileList(path).then(list => filelist = list)
    onMount(async () => {
		filelist = await getFileList(path)

        const params = new URLSearchParams(location.search)
        let i = parseInt(params.get("view"))

        if (!isNaN(i)) {
            i = Math.min(i, filelist.Files.length-1)
            i = Math.max(i, 0)

            viewerOpen = true
            viewerIndex = i
        }

        const qString = viewerOpen ? `?view=${viewerIndex}` : ""

        if (viewerOpen) {
            history.replaceState({ viewerIndex, viewerOpen: false }, null, `${location.origin}${location.pathname}`)
            history.pushState({ viewerIndex, viewerOpen: viewerOpen }, null, `${location.origin}${location.pathname}${qString}`)
        } else {
            history.replaceState({ viewerIndex, viewerOpen: viewerOpen }, null, `${location.origin}${location.pathname}`)
        }
	});

    window.onpopstate = function(event: PopStateEvent) {
        event.preventDefault()

        if (event?.state?.viewerIndex) {
            viewerIndex = event.state.viewerIndex
        }
        if (event?.state?.viewerOpen !== undefined) {
            viewerOpen = event.state.viewerOpen
        }
    }

    const handleClickNext = (event: Event) => {
        event.preventDefault()
        const newIndex = Math.min(viewerIndex + 1, filelist.Files.length-1)
        viewerIndex = newIndex

        history.replaceState({ viewerIndex, viewerOpen }, null, `${location.origin}${location.pathname}?view=${viewerIndex}`)
    }

    const handleClickPrev = (event: Event) => {
        event.preventDefault()
        const newIndex = Math.max(viewerIndex - 1, 0)
        viewerIndex = newIndex

        history.replaceState({ viewerIndex, viewerOpen }, null, `${location.origin}${location.pathname}?view=${viewerIndex}`)
    }

    const handleClose = () => {
        viewerOpen = false
        history.pushState({ viewerIndex, viewerOpen }, null, `${location.origin}${location.pathname}`)
    }

    const handleFileClick = (event: Event) => {
        event.preventDefault()
        const el = event.target as HTMLAnchorElement
        const linkIndex = parseInt(el.getAttribute('data-index'))

        viewerIndex = linkIndex
        viewerOpen = true

        history.pushState({ viewerIndex, viewerOpen }, null, `${location.origin}${location.pathname}?view=${viewerIndex}`)
    }

    $: if (viewerOpen) {
        document.querySelector("body").classList.add("overflow-hidden")
    } else {
        document.querySelector("body").classList.remove("overflow-hidden")
    }

    const handleSettingsToggle = () => {
        settingsOpen = !settingsOpen
    }
</script>

<div class="filelist overflow-x-hidden">
    <!-- <div class="fixed left-0 w-full flex justify-end " > -->
        <button class="fixed material-icons right-0 {settingsOpen && "z-30"}" on:click|preventDefault={handleSettingsToggle}>
            settings
        </button>
    <!-- </div> -->
    <!-- {#await getFileList(path) then filelist} -->
        {#if path !== '/' }
            <div class="dir"><a href={`${path}../`}>..</a></div>
        {/if}
        {#each filelist.Dirs as dirName}
            <div class="dir"><a href={`${path}${dirName}/`}>{ dirName }</a></div>
        {/each}
        {#each filelist.Files as file, index}
            <div class="file"><a href={`${config.staticRoot}${path}${file}`} data-index="{index}" on:click={handleFileClick}>{ file }</a></div>
        {/each}
        {#if settingsOpen}
            <Settings  settings={settings} onChanged={handleOnSettingsChanged}></Settings>
        {/if}
        {#if viewerOpen}
            <Viewer playlist={filePaths} settings={settings} onNext={handleClickNext} onPrev={handleClickPrev} onClose={handleClose} index={viewerIndex}/>
        {/if}
    <!-- {/await} -->
</div>

<style global lang="postcss">
    button {
        height: 2.5rem;
        width: 2.5rem;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        margin: 0.51rem;
    }
    div.filelist > div {
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }

    div.filelist > div.dir > a::before {
        content: "/"
    }

    div.filelist > div.file > a {
        padding-left: 0.4rem;
    }

    div.filelist > div:nth-child(even) {
        background-color:#f0f0f0;
    }
</style>
