import { createContext, useCallback, useContext, useState } from "react";
import { Album } from "../types/types";

interface FetchContextValue {
  fetchAlbum: (uuid: string, albumId: string) => Promise<Album | null>;
  fetchAlbums: (uuid: string) => Promise<Album[] | null>;
  refetchData: () => void;
}

const FetchContext = createContext<FetchContextValue | undefined>(undefined);

export const useFetch = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }
  return context;
};

interface FetchProviderProps {
  children: React.ReactNode;
}

export const FetchProvider: React.FC<FetchProviderProps> = ({ children }) => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetchData = useCallback(() => {
    setRefetchTrigger((prevTrigger) => prevTrigger + 1);
  }, []);

  const fetchAlbum = useCallback(
    async (uuid: string, albumId: string): Promise<Album | null> => {
      try {
        const response = await fetch(`/api/albums?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const decodedAlbumId = decodeURIComponent(albumId);
        const album = data.find((a: Album) => a.album === decodedAlbumId);
        return album || null;
      } catch (error) {
        console.error("Failed to fetch album:", error);
        return null;
      }
    },
    [refetchTrigger]
  );

  const fetchAlbums = useCallback(
    async (uuid: string): Promise<Album[] | null> => {
      try {
        const response = await fetch(`/api/albums?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch albums:", error);
        return null;
      }
    },
    [refetchTrigger]
  );

  return (
    <FetchContext.Provider value={{ fetchAlbum, fetchAlbums, refetchData }}>
      {children}
    </FetchContext.Provider>
  );
};
