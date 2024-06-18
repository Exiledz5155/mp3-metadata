"use client";

import { useEffect, useState } from "react";
import { SongDisplay } from "../../../components/Album-detail/SongDisplay";
import { SongDisplayLoading } from "../../../components/Album-detail/SongDisplayLoading";
import { useFetch } from "../../../contexts/FetchContext";
import { useUUID } from "../../../contexts/UUIDContext";
import { Album, Song } from "../../../types/types";

export default function SongsPage() {
  const { uuid } = useUUID();
  const { fetchAlbums, refetchData } = useFetch();
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const albums = await fetchAlbums(uuid);
        if (albums) {
          const songs = albums.flatMap((album) => album.songs);
          setAllSongs(songs);
          setIsLoaded(true);
        }
      } catch (error) {
        setError("Failed to fetch songs: " + error.message);
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchAllSongs();
  }, [fetchAlbums, uuid, refetchData]);

  if (!isLoaded) {
    return <SongDisplayLoading />;
  }

  if (allSongs.length > 0) {
    const allSongsAlbum: Album = {
      album: "All Songs",
      artist: "",
      songs: allSongs,
    };

    return <SongDisplay album={allSongsAlbum} />;
  }

  return null;
}
