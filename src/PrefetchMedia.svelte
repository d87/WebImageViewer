<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    export let path: string
    const ext = getFileExt(path)
</script>

<style>
</style>

{#if (ext in imageExt)}
    <img class="hidden" src="{path}" alt="gg"/>
{:else if (ext in videoExt)}
    <video class="hidden" src="{path}" loop autoplay controls>
        <track kind="captions"/>
    </video>
{/if}
