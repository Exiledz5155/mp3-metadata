export interface Album {
  album: string;
  artist: string; // rename to albumArtist to be more clear
  albumArt: string; // Note for Aitan: Don't include this in new JSON
  year: number;
  genre: string;
  songs: Song[];
}

export interface Song {
  id: string;
  trackNumber: number;
  title: string;
  duration: string;
  artist: string;
  album: string;
  // add albumArtist
  year: number;
  genre: string;
  image: string;
}
