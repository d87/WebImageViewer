<script lang="ts">
	import { imageExt, videoExt, audioExt, getFileExt } from './config'
	import Panning from './Panning.svelte'
	export let path: string
	const ext = getFileExt(path)
</script>

<style>
</style>

{#if (ext in imageExt)}
	{#key path}
	<Panning>
		<img class="z-30 max-w-full max-h-full" src="{path}" alt="gg"/>
	</Panning>
	{/key}
{:else if (ext in videoExt)}
	<video class="z-30 max-w-full max-h-full" src="{path}" loop autoplay controls><track kind="captions"/></video>
{:else}
	<div>Unsupported file type</div>
{/if}
