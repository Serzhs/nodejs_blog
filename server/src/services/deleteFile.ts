import fs from "fs";

export const deleteFile = (path: string) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, async (err) => {
            if (err) {
                reject(err)
                return
            }

            resolve('deleted')
        })
    })
}
