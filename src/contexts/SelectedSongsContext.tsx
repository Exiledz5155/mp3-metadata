// contexts/SelectedSongsContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SelectedSongsContextType {
  selectedSongs: string[];
  setSelectedSongs: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedSongsContext = createContext<SelectedSongsContextType>({
  selectedSongs: [],
  setSelectedSongs: () => {},
});

export const useSelectedSongs = () => useContext(SelectedSongsContext);

interface SelectedSongsProviderProps {
  children: React.ReactNode;
}

export const SelectedSongsProvider = ({
  children,
}: SelectedSongsProviderProps) => {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const value = {
    selectedSongs,
    setSelectedSongs,
  };

  return (
    <SelectedSongsContext.Provider value={value}>
      {children}
    </SelectedSongsContext.Provider>
  );
};
