export interface Album {
  album: string;
  artist: string;
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

export interface CommonSongProperties {
  id: string;
  trackNumber: string;
  title: string;
  duration: string;
  artist: string;
  albumTitle: string;
  albumArtist: string;
  year: string;
  genre: string;
  image: string;
}
