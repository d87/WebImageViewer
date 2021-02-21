const disableOnInputs = true

export interface IBindingsTable {
    [key: string]: (event?: KeyboardEvent) => void
}

const eventToBindString = (event: KeyboardEvent) => {
    const ctrl = event.ctrlKey
    const alt = event.altKey
    const shift = event.shiftKey
    let key = event.key
    const keyCode = event.keyCode
    if (keyCode === 32) key = "SPACE"
    return `${ctrl ? "CTRL-" : ""}${shift ? "SHIFT-" : ""}${alt ? "ALT-" : ""}${key.toUpperCase()}`
}


let bindingsTable: IBindingsTable

const handleKeyDown = (event: KeyboardEvent): void => {
    if (disableOnInputs) {
        let element
        if(event.target) element=event.target
        if(element.nodeType === 3) element=element.parentNode;
        if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return;
    }

    if (!bindingsTable) return

    const bindString = eventToBindString(event)
    // console.log(bindString, event.key, event.keyCode)
    const func = bindingsTable[bindString]

    if (func === undefined) return

    event.preventDefault()
    event.stopPropagation()

    func(event)
}

export const RegisterKeybindings = (bindings: IBindingsTable) => {
    if (document !== undefined) {
        bindingsTable = bindings
        console.log("registered")
        document.addEventListener("keydown", handleKeyDown)
    }
}

export const UnregisterKeybindings = () => {
    if (document !== undefined) {
        bindingsTable = null
        document.removeEventListener("keydown", handleKeyDown)
    }
}
