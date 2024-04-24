export interface Album {
  album: string;
  artist: string;
  albumArt: string; // remove this
  year: number; // remove this
  genre: string; // remove this
  songs: Song[];
}

export interface Song {
  id: string;
  trackNumber: number;
  title: string;
  duration: string;
  artist: string;
  albumTitle: string; // rename to albumTitle
  albumArtist: string;
  year: number;
  genre: string;
  image: string;
  // add imageHash: string;
}
