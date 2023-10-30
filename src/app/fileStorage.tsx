var filePaths = []

export function addFilePath(path: String) {
    filePaths.push(path);
    console.log(filePaths)
}

export function getFilePaths() {
    console.log(filePaths)
    return filePaths;
}
