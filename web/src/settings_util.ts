export interface ISettings {
    rightToLeft: boolean
    autoRotate: boolean
}

const defaultSettings: ISettings = { // Defaults
    rightToLeft: false,
    autoRotate: false,
}

export const getSettings = (): ISettings => {
    const settingsString = localStorage.getItem("settings")
    let restoredSettings
    if (settingsString) {
        restoredSettings = JSON.parse(settingsString)
    }

    return restoredSettings ?? defaultSettings
}
