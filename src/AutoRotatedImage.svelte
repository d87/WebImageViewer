<script lang="ts">
    export let src
    // const VERTICAL = 1
    // const HORIZONTAL = 2
    // let orientation = VERTICAL
    let naturalHeight = 1
    let naturalWidth = 1
    let isLoaded = false

    let forcedWidth = "auto"
    let forcedHeight = "auto"
    // let transforms = ""

    // const handleOnLoad = (event: Event) => {
    //     const img = event.target as HTMLImageElement
    //     console.log("ON LOAD", img.naturalWidth, img.naturalHeight)
    //     naturalWidth = img.naturalWidth
    //     naturalHeight = img.naturalHeight
    //     // originalClientWidth = img.clientWidth
    //     isLoaded = true
    // }

    const onSizeReceived = (width: number, height: number) => {
        console.log("ON LOAD", width, height)
        naturalWidth = width
        naturalHeight = height
        isLoaded = true
    }

    function sizepolling(img: HTMLImageElement, handler: (w: number, h: number) => void) {
        const poll = setInterval(() => {
            if (img.naturalWidth) {
                clearInterval(poll);
                handler(img.naturalWidth, img.naturalHeight)
            }
        }, 5);

        return {
            destroy() {
                clearInterval(poll);
            }
        };
    }

    $: scale = naturalWidth > naturalHeight ? naturalWidth / naturalHeight : 1

    $: if (scale > 1) {

        forcedHeight = `calc(100vw * ${scale})`
        forcedWidth = "100vw"
        // transforms = `scale(${scale}) rotate(90deg) translateY(-100%)`
    } else {
        forcedHeight = "auto"
        forcedWidth = "auto"
        // transforms = "scale(1)"
    }

    // function onload(node, handler) {
    //     node.addEventListener('load', handler);

    //     return {
    //         destroy() {
    //             node.removeEventListener('load', handler);
    //         }
    //     };
    // }

    $: visiblityClass = (isLoaded) ? "loaded" : "not_loaded"
    $: rotationClass = (scale > 1) ? "rotate" : ""
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

</style>

<div style="max-width: 100%; height: {forcedHeight}" class="{visiblityClass}" >
    <img
        style="transform-origin: top left; --rotation-scale: {scale};"
        class="{rotationClass}"
        src={src}
        use:sizepolling={onSizeReceived}
        alt="123"
    />
</div>
