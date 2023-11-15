import JSZip from "jszip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const files = JSON.parse(searchParams.get('files') || '');

  interface FileDownload {
    name: string;
    url: string;
  }
  
  const downloads = await Promise.all(files.map(async (file: FileDownload) => {
    const response = await fetch(file.url)
    const type = response.headers.get('Content-Type')
    const data = await response.arrayBuffer()
    return {
      ...file,
      data,
      type: type //type?.replace('image/', '')
    }
  }))

  const zip = new JSZip();

  downloads.forEach(download => {
    zip.file(`${download.name}`, download.data);
    // zip.file(`${download.name}.${download.type}`, download.data);
  })

  const archive = await zip.generateAsync({type:"blob"});

  return new Response(archive, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip'
    }
  })
}

/*

for each file:
filename, path

zip.file(filename, get_data(path), ?{base64: true})

*/