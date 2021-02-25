<script lang="ts">
    // import { createEventDispatcher } from 'svelte';
    import type { ISettings } from './settings_util'

    // const dispatch = createEventDispatcher();

    export let onChanged: (name: string, value: any) => void
    export let settings: ISettings

    const handleInputCheckbox = (event: any) => {
        const el = event.target as HTMLInputElement
        onChanged(el.name, el.checked)
    }

</script>

<div class="fixed bottom-0 left-0 top-0 right-0 z-10 w-screen h-screen">
    <div class="absolute bottom-0 left-0 top-0 right-0 bg-black opacity-90"/>

    <!-- relative is needed for z-index to work -->
    <div class="relative z-20 w-full h-full">
        <!-- <div class="text-center" style="height: 2rem;">
            <a class="px-4 py-2" href=" " on:click|preventDefault={onClose}>Exit</a>
        </div> -->

        <div class="m-8">
            <div class="my-4">
                <input type="checkbox" id="rightToLeft" checked={settings.rightToLeft} on:change={handleInputCheckbox} name="rightToLeft"/>
                <label for="rightToLeft">Right-to-Left reading direction</label>
            </div>
            <div class="my-4">
                <input type="checkbox" id="autoRotate" checked={settings.autoRotate} on:change={handleInputCheckbox} name="autoRotate"/>
                <label for="autoRotate">Auto Rotate</label>
            </div>

        </div>
    </div>
</div>

<style>
    label {
        display: inline;
        color: white;
    }
</style>
