import { Button, ButtonGroup, Center, Stack } from '@chakra-ui/react'

function DownloadButton(){
    let test = "/test.txt"
    const downloadFileAtURL = (url)=>{

        const fileName = url.split("/").pop();
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }
    return (
        <Button onClick={()=> downloadFileAtURL(test)}>Download Zip</Button>
    )
}
export default DownloadButton;