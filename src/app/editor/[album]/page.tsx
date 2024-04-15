"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SongDisplay } from "../../../components/Album-detail/SongDisplay";
import { useEffect, useState } from "react";
import { Album, Song } from "../../../types/types";
import { useUUID } from "../../../contexts/UUIDContext";
import { SongDisplayLoading } from "../../../components/Album-detail/SongDisplayLoading";

export default function AlbumPage() {
  const { uuid, generateUUID } = useUUID();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [albumData, setAlbumData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setisLoaded] = useState(false);
  const pathname = usePathname();
  const albumId = pathname.split("/").pop(); // This assumes 'albumId' is the last segment of the URL.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/albums?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlbums(data);

        if (!albumId) return;
        const decodedAlbumId = decodeURIComponent(albumId);

        const album = data.find((a) => a.album === decodedAlbumId);
        setAlbumData(album);
      } catch (e) {
        setError("Failed to fetch albums: " + e.message);
        setAlbumData(null);
        console.error(e);
      } finally {
        setisLoaded(true);
      }
    };

    fetchData();
  }, [albumId]);

  if (!isLoaded) {
    return <SongDisplayLoading />;
  }

  if (albumData) {
    return <SongDisplay album={albumData} />;
  }
}
