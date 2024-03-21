"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SongDisplay } from "../../../components/SongDisplay";
import { useEffect, useState } from "react";

const AlbumPage = () => {
  const [albumData, setAlbumData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const albumId = pathname.split("/").pop(); // This assumes 'albumId' is the last segment of the URL.
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!albumId) return; // Make sure albumId is not null or undefined

    const decodedAlbumId = decodeURIComponent(albumId);
    fetch("/albums.json")
      .then((res) => res.json())
      .then((data) => {
        const album = data.find((a) => a.album === decodedAlbumId);
        setAlbumData(album);
      })
      .catch((error) => {
        console.error("Failed to load album data:", error);
        setAlbumData(null); // Handle the error state appropriately
      });
  }, [albumId]); // Dependency on albumId

  if (!albumData) return <p>Loading...</p>;
  if (!albumData) return <p>Album not found</p>;

  return <SongDisplay album={albumData} />;
};

export default AlbumPage;
