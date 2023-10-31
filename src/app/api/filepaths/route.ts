import { getFilePaths } from '../../fileStorage';

export async function GET(req, res) {
    const data = getFilePaths();
    return Response.json(data)
  }