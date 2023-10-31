export var filePaths = []

export function addFilePath(path) {
    filePaths.push(path);
    const paths = getFilePaths();
}

export function getFilePaths() {
    console.log('getting file paths')
    console.log(filePaths)
    return filePaths;
}