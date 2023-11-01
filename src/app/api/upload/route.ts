import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { addFilePath } from '../../fileStorage'
import { read_metadata } from '../../metadata'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `/tmp/${file.name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  //add to filePaths list
  const fileInfo = read_metadata(path);
  fileInfo['filePath'] = path
  //const fileInfo = path
  console.log('upload route')
  console.log(fileInfo)
  addFilePath(fileInfo);


  return NextResponse.json({ success: true })
}