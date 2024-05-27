export interface Album {
  album: string;
  artist: string;
  songs: Song[];
}

export interface Song {
  id: string;
  filePath: string;
  trackNumber: number;
  title: string;
  duration: string;
  artist: string;
  albumTitle: string;
  albumArtist: string;
  year: number;
  genre: string;
  image: string;
}

export interface CommonSongProperties {
  id: string;
  trackNumber: string; // was number
  title: string;
  duration: string;
  artist: string;
  albumTitle: string;
  albumArtist: string;
  year: string; // was number
  genre: string;
  image: string;
}

export interface HoverableImageProps {
  songs: Song[];
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  commonProperties: CommonSongProperties;
  selectedFile: File | null;
}
