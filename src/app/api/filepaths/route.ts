import { getFilePaths } from '../../fileStorage';

export async function GET(req, res) {
    const data = getFilePaths();
    //console.log('filepaths GET request returning:', data)
    return Response.json(data)
  }