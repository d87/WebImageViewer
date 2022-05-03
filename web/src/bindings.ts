const disableOnInputs = true

export interface IBindingsTable {
    [key: string]: (event?: KeyboardEvent) => void
}

const eventToBindString = (event: KeyboardEvent) => {
    const ctrl = event.ctrlKey
    const alt = event.altKey
    const shift = event.shiftKey
    let key = event.code
    return `${ctrl ? "CTRL-" : ""}${shift ? "SHIFT-" : ""}${alt ? "ALT-" : ""}${key.toUpperCase()}`
}


let bindingsTable: IBindingsTable

const handleKeyDown = (event: KeyboardEvent): void => {
    if (disableOnInputs) {
        let element: HTMLElement
        if(event.target) element = event.target as HTMLElement
        if(element.nodeType === 3) element = element.parentNode as HTMLElement
        if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return;
    }

    if (!bindingsTable) return

    const bindString = eventToBindString(event)
    const func = bindingsTable[bindString]

    if (func === undefined) return

    event.preventDefault()
    event.stopPropagation()

    func(event)
}

export const RegisterKeybindings = (bindings: IBindingsTable) => {
    if (document !== undefined) {
        bindingsTable = bindings
        document.addEventListener("keydown", handleKeyDown)
    }
}

export const UnregisterKeybindings = () => {
    if (document !== undefined) {
        bindingsTable = null
        document.removeEventListener("keydown", handleKeyDown)
    }
}
