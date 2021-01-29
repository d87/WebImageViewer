// import 'regenerator-runtime/runtime'
import config from "../config"

export interface IFileList {
    Dirs: Array<string>
    Files: Array<string>
}

export const getFileList = async (path: string): Promise<IFileList> => {
    let response = await fetch(`${config.apiUrl}/static${path}`, {
        // method: 'POST', // or 'PUT'
        headers: {
          'Accept': 'application/json',
        }
    });
    let data = await response.json();
    console.log(data)
    return data
}

