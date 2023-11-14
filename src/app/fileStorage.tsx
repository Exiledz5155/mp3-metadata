export var filePaths = []

export function addFilePath(path) {
    filePaths.push(path);
    const paths = getFilePaths();
    //console.log('adding file to storage', path)
}

export function getFilePaths() {
    //console.log('getting file info from storage', filePaths[0]['title'])
    return filePaths;
}