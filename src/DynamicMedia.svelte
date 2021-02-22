<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    // import Panning from './Panning.svelte'
    import AutoRotatedImage from './AutoRotatedImage.svelte'
    export let path: string
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
        <!-- <img src="{path}" alt="gg"/> -->
        <AutoRotatedImage on:imgclientupdate src={path} />
    {:else}
        <img src="{path}" alt="gg"/>
        <!-- <img src="{path}" class="m-auto max-w-full max-h-full" alt="gg"/> -->
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
