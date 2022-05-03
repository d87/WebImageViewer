<script lang="ts">
    export let src: string
    import { afterUpdate } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let naturalHeight = 1
    let naturalWidth = 1
    let manualZoom = 1
    let aspectRatio = 1
    let stretch_scale = 1
    let isLoaded = false

    let forcedWidth = "auto"
    let forcedHeight = "auto"
    let imageEl: HTMLImageElement

    const dispatch = createEventDispatcher();

    // const handleOnLoad = (event: Event) => {
    //     const img = event.target as HTMLImageElement
    //     console.log("ON LOAD", img.naturalWidth, img.naturalHeight)
    //     naturalWidth = img.naturalWidth
    //     naturalHeight = img.naturalHeight
    //     // originalClientWidth = img.clientWidth
    //     isLoaded = true
    // }

    const dispatchUpdatedClientRect = (el: HTMLImageElement) => {
        const nW = el.naturalWidth
        const nH = el.naturalHeight
        const ar = nW > nH ? nW / nH : 1
        if (ar > 1) {
            dispatch('imgclientupdate', {
                width: el.clientWidth*stretch_scale*manualZoom,
                height: el.clientWidth*ar*stretch_scale*manualZoom,
            });
        } else {
            dispatch('imgclientupdate', {
                width: el.clientWidth*stretch_scale*manualZoom,
                height: el.clientHeight*stretch_scale*manualZoom,
            });
        }
    }

    const onSizeReceived = (el1: any) => {
        const el = el1 as HTMLImageElement
        const width = el.naturalWidth
        const height = el.naturalHeight
        console.log("ON LOAD NATURAL", width, height)
        naturalWidth = width
        naturalHeight = height
        aspectRatio = naturalWidth > naturalHeight ? naturalWidth / naturalHeight : 1
        stretch_scale = naturalWidth >= window.innerWidth ? 1 : window.innerWidth/naturalWidth
        isLoaded = true

        dispatchUpdatedClientRect(el)
        console.log("ON LOAD CLIENT", el.clientWidth, el.clientHeight)
    }

    const zoomIn = (_event: Event) => {
        manualZoom = manualZoom + 0.5
        onSizeReceived(imageEl)
    }

    const zoomOut = (_event: Event) => {
        manualZoom = (manualZoom > 1) ? manualZoom - 0.5 : 1
        onSizeReceived(imageEl)
    }

    // function sizepolling(img: HTMLImageElement, handler: (w: number, h: number) => void) {
    //     const poll = setInterval(() => {
    //         if (img.naturalWidth) {
    //             clearInterval(poll);
    //             console.log("ON LOAD CLIENT (POLLING)", img.clientWidth, img.clientHeight)
    //             handler(img)
    //         }
    //     }, 5);
    // }

    afterUpdate(() => {
        // if (!imageEl.naturalWidth || !imageEl.naturalHeight) {
        //     sizepolling(imageEl, onSizeReceived)
        // } else {
            onSizeReceived(imageEl)
        // }
    })

    let rotationClass: string

    $: if (aspectRatio > 1) {
        forcedHeight = `calc(100vw * ${aspectRatio})`
        forcedWidth = "100vw"
        rotationClass = "rotate"
        // transforms = `scale(${scale}) rotate(90deg) translateY(-100%)`
    } else {
        forcedHeight = `calc(100vw * ${naturalHeight/naturalWidth})`
        forcedWidth = "100vw"
        rotationClass = "stretch"
        // transforms = "scale(1)"
    }

    function onload(node: HTMLImageElement, handler: (e: Event) => void) {
        node.addEventListener('load', handler);
        return {
            destroy() {
                node.removeEventListener('load', handler);
            }
        };
    }

    $: visiblityClass = (isLoaded) ? "loaded" : "not_loaded"
</script>

<style>
    div {
        margin: auto;
    }

    @keyframes fadeIn {
        from {
            opacity: 50%;
        }

        to {
            opacity: 100%;
        }
    }

    button {
        font-family: 'Material Icons';
        font-size: 2em;
        height: 3rem;
        width: 3rem;
        text-align: center;
        border: none;
        color: #888;
        text-decoration: none;
        line-height: 1.5rem;
        opacity: 20%;
        /* width: 50%; */
    }

    div.not_loaded {
        opacity: 50%;
    }
    div.loaded {
        opacity: 100%;
        animation: fadeIn 0.4s;
    }
    img {
        transform-box: fill-box;
        object-fit: contain;
    }

    @keyframes rotateIn {
        from {
            /* opacity: 0%; */
            transform: scale(1);
        }

        to {
            /* opacity: 100%; */
            transform: scale(var(--rotation-scale)) rotate(90deg) translateY(-100%);
        }
    }

    img.rotate {
        /* transform: scale(var(--rotation-scale)) rotate(90deg) translateY(-100%); */
        /* opacity: 100%; */
        transform: scale(var(--rotation-scale)) rotate(90deg) translateY(-100%);
        animation: rotateIn 0.3s
    }

    img.stretch {
        transform: scale(var(--stretch-scale));
    }
</style>

<!-- use:sizepolling={onSizeReceived} -->
<div class="contents">
    <div class="relative" style="transform-origin: top left; transform: scale({manualZoom});">
    <!-- <div class="relative" style="transform-origin: top left; outline: green solid 3px;"> -->
        <button type="button" aria-label="Zoom Out" class="material-icons absolute z-40 top-0" style="left: 10%;"
            on:click|preventDefault={zoomOut}
            on:touchstart|preventDefault={zoomOut}
        >zoom_out</button>
        <button type="button" aria-label="Zoom in" class="material-icons absolute z-40 top-0" style="left: calc(10% + 3rem);"
            on:click|preventDefault={zoomIn}
            on:touchstart|preventDefault={zoomIn}
        >zoom_in</button>

        <div style="max-width: 100%; width: {forcedWidth}; height: {forcedHeight}" class="{visiblityClass}" >
            <img
                style="transform-origin: top left; --rotation-scale: {aspectRatio*stretch_scale}; --stretch-scale: {stretch_scale}"
                use:onload={onSizeReceived}
                class="{rotationClass}"
                src={src}
                bind:this={imageEl}
                alt="123"
            />
        </div>
    </div>
</div>
