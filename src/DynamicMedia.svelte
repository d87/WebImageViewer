<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    import Panning from './Panning.svelte'
    import AutoRotatedImage from './AutoRotatedImage.svelte'
    export let path: string
    export let onScaleChanged: (scale: number) => void
    let screenWidth

    const eatEvent = (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
    }

    $: filename = path.split('/').pop();
    $: ext = getFileExt(filename)
    $: isMD = screenWidth < 992
    $: console.log(screenWidth, isMD)

</script>

<svelte:window bind:outerWidth={screenWidth}/>

<style>
    h3 {
        font-size: 1.5em;
    }
</style>

{#if (ext in imageExt)}
    {#if isMD}
    <Panning onScaleChanged={onScaleChanged}>
        <!-- <img src="{path}" alt="gg"/> -->
        <AutoRotatedImage src={path} />
    </Panning>
    {:else}
        <img src="{path}" class="m-auto max-w-full max-h-full" alt="gg"/>
    {/if}
{:else if (ext in videoExt)}
    <video class="relative max-w-full" src="{path}" loop autoplay controls>
        <track kind="captions"/>
    </video>
{:else if (ext in audioExt)}
    <div class="relative" style="max-width: 80%; margin: auto;" >
        <h3>{filename}</h3>
        <audio src="{path}" autoplay controls>
            <track kind="captions"/>
        </audio>
    </div>
{:else}
    <div>Unsupported file type</div>
{/if}
