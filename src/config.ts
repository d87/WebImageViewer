export const config = {
    apiUrl: "http://192.168.1.1:3000",
    staticRoot: "http://192.168.1.1:3000/static",
}

export const videoExt = {
    'mp4': true,
    'webm': true,
    'm4v': true,
}

export const imageExt = {
    'png': true,
    'gif': true,
    'webp': true,
    'jpeg': true,
    'jpg': true,
}

export const audioExt = {
    'm4a': true,
    'mp3': true,
    'ogg': true,
    'flac': true,
}

export function getFileExt(path: string) {
    return path.split('.').pop();
}


export default config