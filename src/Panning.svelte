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
        scale = (scale == 2) ? 1 : 2
    }

    $: transforms = (scale > 1)
        ? `translate(${xOffset}px, ${yOffset}px) scale(${scale}) `
        : ""

</script>

<style>
</style>

<div>
    <a class="absolute top-0 right-12 p-1" href=" " on:click|preventDefault={zoomIn}>Zoom</a>
    <div style="position: relative; transform: {transforms}"
        on:touchstart|preventDefault={panTouchStart}
        on:touchmove|preventDefault={panTouchMove}
        on:touchend|preventDefault={panTouchEnd}
        on:touchcancel|preventDefault={panTouchEnd}

        on:mousedown|preventDefault={panPointerStart}
        on:mousemove|preventDefault={panPointerMove}
        on:mouseup|preventDefault={panTouchEnd}
    >
        <slot></slot>
    </div>
</div>
