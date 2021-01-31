<script lang="ts">
    let scale = 1
    let xOffset = 0
    let yOffset = 0
    let panning = false
    let prevX = 0
    let prevY = 0

    const panTouchEnd = (event: TouchEvent|MouseEvent) => {
        panning = false
    }
    const panTouchStart = (event: TouchEvent) => {
        if (scale == 1) return
        panning = true
        prevX = event.touches[0].clientX
        prevY = event.touches[0].clientY
    }

    const panTouchMove = (event: TouchEvent) => {
        if (!panning) return
        const cX = event.touches[0].clientX
        const cY = event.touches[0].clientY
        // console.log("touch move")
        xOffset = xOffset + (cX - prevX)
        yOffset = yOffset + (cY - prevY)
        prevX = cX
        prevY = cY
    }

    const panPointerStart = (event: MouseEvent) => {
        // console.log("mouse start")
        if (scale == 1) return
        panning = true
        prevX = event.clientX
        prevY = event.clientY
    }

    const panPointerMove = (event: MouseEvent) => {
        if (!panning) return
        const cX = event.clientX
        const cY = event.clientY
        xOffset = xOffset + (cX - prevX)
        yOffset = yOffset + (cY - prevY)
        prevX = cX
        prevY = cY
    }

    const zoomIn = (event: Event) => {
        scale = scale + 0.5
    }

    const zoomOut = (event: Event) => {
        scale = (scale > 1) ? scale - 0.5 : 1
    }

    $: transforms = (scale > 1)
        ? `translate(${xOffset}px, ${yOffset}px) scale(${scale}) `
        : ""

</script>

<style>
    button {
        font-size: 2.5rem;
        height: 3rem;
        width: 8rem;
        text-align: center;
        border: none;
        color: #888;
        text-decoration: none;
        line-height: 1.5rem;
        opacity: 70%;
        /* width: 50%; */
    }

    /* div.controls{
        transform: translate(-50%);
        width: 12rem;
        height: 3rem;
    } */

</style>

<div class="max-w-full h-full">
    <div class="relative block max-w-full h-full" style="transform: {transforms}"
        on:touchstart|preventDefault={panTouchStart}
        on:touchmove|preventDefault={panTouchMove}
        on:touchend|preventDefault={panTouchEnd}
        on:touchcancel|preventDefault={panTouchEnd}

        on:click

        on:mousedown|preventDefault={panPointerStart}
        on:mousemove|preventDefault={panPointerMove}
        on:mouseup|preventDefault={panTouchEnd}
        on:mouseout|preventDefault={panTouchEnd}
    >
        <button type="button" aria-label="Zoom Out" class="absolute top-0 right-1/2"
            on:click|preventDefault={zoomOut}
            on:touchstart|preventDefault={zoomOut}
        />
        <button type="button" aria-label="Zoom in" class="absolute top-0 left-1/2"
            on:click|preventDefault={zoomIn}
            on:touchstart|preventDefault={zoomIn}
        />
        <slot></slot>
    </div>
</div>
