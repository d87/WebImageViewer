<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    import Panning from './Panning.svelte'
    import AutoRotatedImage from './AutoRotatedImage.svelte'
    export let path: string
    export let onScaleChanged: (scale: number) => void

    const ext = getFileExt(path)

    const eatEvent = (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
    }

</script>

<style>
</style>

{#if (ext in imageExt)}
    {#key path}
    <Panning onScaleChanged={onScaleChanged}>
        <!-- <img src="{path}" alt="gg"/> -->
        <AutoRotatedImage src={path} />
    </Panning>
    {/key}
{:else if (ext in videoExt)}
    <video class="h-full w-full" src="{path}" loop autoplay controls><track kind="captions"/></video>
{:else}
    <div>Unsupported file type</div>
{/if}
