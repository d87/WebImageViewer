<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    import Panning from './Panning.svelte'
    export let path: string
    const ext = getFileExt(path)

    const eatEvent = (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
    }

</script>

<style>
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>

{#if (ext in imageExt)}
    {#key path}
    <Panning on:click={eatEvent}>
        <img src="{path}" alt="gg"/>
    </Panning>
    {/key}
{:else if (ext in videoExt)}
    <video on:click={eatEvent} class="h-full w-full" src="{path}" loop autoplay controls><track kind="captions"/></video>
{:else}
    <div>Unsupported file type</div>
{/if}
