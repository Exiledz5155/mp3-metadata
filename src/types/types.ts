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
  album: string;
  // add albumArtist
  year: number;
  genre: string;
  image: string;
}
