export var filePaths = []

export function addFilePath(path: String) {
    filePaths.push(path);
    const paths = getFilePaths();
}

export function getFilePaths() {
    return filePaths;
}