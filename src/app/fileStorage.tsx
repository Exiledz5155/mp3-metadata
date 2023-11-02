const filePaths = []
export default filePaths;   // made this a default export

export function addFilePath(path) {
    filePaths.push(path);
    console.log("Pushed to filePaths", filePaths)
    const paths = getFilePaths();
}

export function getFilePaths() {
    console.log('getting file paths')
    console.log(filePaths)
    return filePaths;
}