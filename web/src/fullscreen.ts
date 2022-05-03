export const handleFullscreenEnter = (fullscreenRoot: HTMLElement) => () => {
    if (fullscreenRoot && !document.fullscreenElement) {
        fullscreenRoot.requestFullscreen()
    }
}

export const handleFullscreenExit = () => {
    document.exitFullscreen()
}



export function listenfullscreen(node: HTMLElement, handler: (isFullscreen: boolean) => void) {

    const onFullscreenChanged = (event: Event) => {
        if (document.fullscreenElement) {
            handler(true)
        } else {
            handler(false)
        }
    }

    document.addEventListener('fullscreenchange', onFullscreenChanged);

    return {
        destroy() {
            document.removeEventListener('fullscreenchange', onFullscreenChanged);
        }
    };
}
