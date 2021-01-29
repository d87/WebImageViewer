<script lang="ts">
    import DynamicMedia from './DynamicMedia.svelte'
    import PrefetchMedia from './PrefetchMedia.svelte'
    export let playlist: string[]
    export let index: number
    export let onClose: () => void
    export let onPrev: (event: Event) => void
    export let onNext: (event: Event) => void

    $: imagePath = playlist[index]
    $: prefetchPath = playlist[index+1]
    $: prefetchPath2 = playlist[index+2]
</script>

<div class="fixed bottom-0 left-0 top-0 right-0 z-10">
    <div class="fixed bottom-0 left-0 top-0 right-0 bg-black opacity-80 "/>

    <!-- <HotKeys keyMap={keyMap} handlers={keybindHandlers} allowChanges={true}> -->
        <div class="relative z-20">
            <!-- <a class="px-4" on:click={fullscreenHandle.enter}>Fullscreen</a> -->
            <a class="px-4" on:click={onClose} href=".">Exit</a>
        </div>

        <!-- <FullScreen handle={fullscreenHandle}> -->
        <div class="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <DynamicMedia  path={imagePath}/>
            <PrefetchMedia path={prefetchPath}/>
            <PrefetchMedia path={prefetchPath2}/>
            <div on:click={onPrev} class="fixed z-40 top-0 left-0 w-10 h-full bg-black opacity-10"></div>
            <div on:click={onNext} class="fixed z-40 top-0 right-0 w-10 h-full bg-black opacity-10"></div>
        </div>
        <!-- </FullScreen> -->
    <!-- </HotKeys> -->
</div>

<style>
</style>