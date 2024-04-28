// contexts/SelectedSongsContext.js

import React, { createContext, useContext, useState } from "react";

const SelectedSongsContext = createContext([]);

export const useSelectedSongs = () => useContext(SelectedSongsContext);

export const SelectedSongsProvider = ({ children }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

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
