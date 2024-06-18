"use client";

// AlbumPage.tsx
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SongDisplay } from "../../../components/Album-detail/SongDisplay";
import { SongDisplayLoading } from "../../../components/Album-detail/SongDisplayLoading";
import { useFetch } from "../../../contexts/FetchContext";
import { useUUID } from "../../../contexts/UUIDContext";
import { Album } from "../../../types/types";

export default function AlbumPage() {
  const { uuid } = useUUID();
  const { fetchAlbum, refetchData } = useFetch();
  const [albumData, setAlbumData] = useState<Album | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const pathname = usePathname();
  const albumId = pathname.split("/").pop() || "";

  useEffect(() => {
    const fetchAlbumWrapper = async () => {
      try {
        const album = await fetchAlbum(uuid, albumId);
        setAlbumData(album);
        setIsLoaded(true);
      } catch (error) {
        setError("Failed to fetch album: " + error.message);
        setAlbumData(null);
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchAlbumWrapper();
  }, [albumId, fetchAlbum, uuid, refetchData]);

  if (!isLoaded) {
    return <SongDisplayLoading />;
  }

  if (albumData) {
    return <SongDisplay album={albumData} />;
  }

  return null;
}
