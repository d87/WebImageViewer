<script lang="ts">
    import DynamicMedia from './DynamicMedia.svelte'
    import PrefetchMedia from './PrefetchMedia.svelte'
    import { handleFullscreenEnter, handleFullscreenExit, listenfullscreen } from './fullscreen'
    import { afterUpdate, onMount } from 'svelte';
    export let playlist: string[]
    export let index: number
    export let onClose: () => void
    export let onPrev: (event: Event) => void
    export let onNext: (event: Event) => void

    let isFullscreen = false
    let isOverflown = false
    let fullscreenRoot: HTMLElement
    let isVerticalAlignment: boolean

    const onFullscreenUpdate = (isFullscreenNow: boolean) => {
        isFullscreen = isFullscreenNow
    }

    const isOverflownY = ({ clientHeight, scrollHeight }) => {
        return scrollHeight > clientHeight
    }

    afterUpdate(() => {
        isOverflown = isOverflownY(fullscreenRoot)
        // console.log('vert align', isVerticalAlignment)
    })

    const handleOnScale = (scale) => {
        isOverflown = isOverflownY(fullscreenRoot)
        console.log("new scale", scale, isVerticalAlignment)
    }

    $: enterFullsceren = handleFullscreenEnter(fullscreenRoot)

    $: imagePath = playlist[index]
    $: prefetchPath = playlist[index+1]
    $: prefetchPath2 = playlist[index+2]
    $: isVerticalAlignment = isFullscreen && !isOverflown
    $: contentClass = isVerticalAlignment ? "content-center" : "content-start"
    // $: console.log(contentClass)
</script>

<div class="fixed bottom-0 left-0 top-0 right-0 z-10 w-screen h-screen">
    <div class="absolute bottom-0 left-0 top-0 right-0 bg-black opacity-90"/>

    <!-- relative is needed for z-index to work -->
    <div class="relative z-20 w-full h-full">
    <!-- <div class="relative z-20 w-full h-full"  on:click|preventDefault={onClose}> -->
        <div class="text-center" style="height: 2rem;">
            <a class="px-4 py-2" href=" " on:click|stopPropagation|preventDefault={enterFullsceren}>Fullscreen</a>
            <a class="px-4 py-2" href=" " on:click|preventDefault={onClose}>Exit</a>
        </div>


        <div bind:this={fullscreenRoot}
            use:listenfullscreen={onFullscreenUpdate}
            style="height: {isFullscreen ? "100%" : "calc(100vh - 2rem)"}"
            class="grid items-start {contentClass} overflow-scroll w-full"
        >

            <DynamicMedia onScaleChanged={handleOnScale} path={imagePath}/>
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
