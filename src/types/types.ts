export interface Album {
  album: string;
  artist: string;
  albumArt: string; // Note for Aitan: Don't include this in new JSON
  year: number;
  genre: string;
  songs: Song[];
}

export interface Song {
  trackNumber: number;
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}
