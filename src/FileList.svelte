<script lang="ts">
    import { onMount } from 'svelte';
    import Viewer from './Viewer.svelte'
    import { getFileList } from './api/api'
    import type { IFileList } from './api/api'
    import { config } from './config'
    // export let path: string
    export let location: any
    let viewerOpen: boolean
    let viewerIndex: number
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
	});

    const handleClickNext = (event: Event) => {
        event.preventDefault()
        const newIndex = Math.min(viewerIndex + 1, filelist.Files.length-1)
        viewerIndex = newIndex
    }

    const handleClickPrev = (event: Event) => {
        event.preventDefault()
        console.log("click prev", viewerIndex)
        const newIndex = Math.max(viewerIndex - 1, 0)
        viewerIndex = newIndex
    }

    const handleClose = () => { viewerOpen = false }

    const handleFileClick = (event: Event) => {
        event.preventDefault()
        const el = event.target as HTMLAnchorElement
        console.log("Selecting", el.href)
        const linkIndex = parseInt(el.getAttribute('data-index'))
        viewerIndex = linkIndex
        viewerOpen = true
    }

    // $: if (viewerOpen) {
    //     document.querySelector("body").classList.add("overflow-hidden")
    // } else {
    //     document.querySelector("body").classList.remove("overflow-hidden")
    // }
</script>

<div class="overflow-x-hidden">
    <!-- {#await getFileList(path) then filelist} -->
        {#each filelist.Dirs as dirName}
            <div><a href={`${path}${dirName}/`}>{ dirName }</a></div>
        {/each}
        {#each filelist.Files as file, index}
            <div><a href={`${config.staticRoot}${path}${file}`} data-index="{index}" on:click={handleFileClick}>{ file }</a></div>
        {/each}
        {#if viewerOpen}
            <Viewer playlist={filePaths} onNext={handleClickNext} onPrev={handleClickPrev} onClose={handleClose} index={viewerIndex}/>
        {/if}
    <!-- {/await} -->
</div>

<style>
</style>
