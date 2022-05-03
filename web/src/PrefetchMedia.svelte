<script lang="ts">
    import { imageExt, videoExt, audioExt, getFileExt } from './config'
    export let path: string
    $: ext = (path !== undefined) ? getFileExt(path) : undefined
</script>

<style>
</style>

{#if path}
    {#if (ext in imageExt)}
        <!-- <img class="hidden" src="{path}" alt="gg"/> -->
        <link rel=preload href="{path}" as=image />
    {:else if (ext in videoExt)}
        <link rel=preload href="{path}" as=video />
        <!-- <video class="hidden" src="{path}" >
            <track kind="captions"/>
        </video> -->
    {:else if (ext in audioExt)}
        <link rel=preload href="{path}" as=audio />
    {/if}
{/if}
