<script lang="ts">
    import DynamicMedia from './DynamicMedia.svelte'
    import PrefetchMedia from './PrefetchMedia.svelte'
    export let playlist: string[]
    export let index: number
    export let onClose: () => void
    export let onPrev: (event: Event) => void
    export let onNext: (event: Event) => void

    let isFullscreen = false
    let fullscreenRoot: HTMLElement

    const handleFullscreenEnter = () => {
        if (fullscreenRoot && !document.fullscreenElement) {
            fullscreenRoot.requestFullscreen()
        }
    }

    const handleFullscreenExit = () => {
        document.exitFullscreen()
    }

    $: imagePath = playlist[index]
    $: prefetchPath = playlist[index+1]
    $: prefetchPath2 = playlist[index+2]
</script>

<div class="fixed bottom-0 left-0 top-0 right-0 z-10 w-full h-full">
    <div class="absolute bottom-0 left-0 top-0 right-0 bg-black opacity-90"/>

    <div class="relative z-20  w-full h-full"  on:click|preventDefault={onClose}>
        <div class="text-center">
            <a class="px-4 py-2" href=" " on:click|stopPropagation|preventDefault={handleFullscreenEnter}>Fullscreen</a>
            <!-- <a class="px-4 py-2" href=" " on:click|preventDefault={onClose}>Exit</a> -->
        </div>


        <div bind:this={fullscreenRoot} class="grid place-items-center content-center h-full w-full">
            <DynamicMedia  path={imagePath}/>
            <PrefetchMedia path={prefetchPath}/>
            <PrefetchMedia path={prefetchPath2}/>
            <buttton on:click|stopPropagation={onPrev} class="fixed z-40 top-0 cursor-pointer left-0 w-10 h-full bg-black opacity-0 lg:hover:opacity-10"></buttton>
            <buttton on:click|stopPropagation={onNext} class="fixed z-40 top-0 cursor-pointer right-0 w-10 h-full bg-black opacity-0 lg:hover:opacity-10"></buttton>
        </div>
    </div>
</div>

<style>
    a {
        color: #aaa;
        text-decoration: none;
    }
</style>
