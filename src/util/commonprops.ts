import { Album, Song, CommonSongProperties } from "../types/types";

export function calculateCommonProperties(songs: Song[]): CommonSongProperties {
  return songs.reduce<CommonSongProperties>(
    (acc, song, index) => {
      if (index === 0) {
        // Initialize with the first song's properties
        return {
          id: song.id.toString(),
          trackNumber: song.trackNumber?.toString() || "",
          title: song.title,
          artist: song.artist,
          albumTitle: song.albumTitle,
          albumArtist: song.albumArtist,
          year: song.year.toString(),
          genre: song.genre,
          duration: song.duration.toString(), // Initialize with first song's duration
          image: song.image,
        };
      } else {
        const currentYear = song.year ? song.year : 0; // Skip invalid year data
        let minYear = parseInt(acc.year.split("-")[0]) || currentYear;
        let maxYear =
          parseInt(acc.year.split("-")[1] || acc.year) || currentYear;

        if (currentYear !== 0) {
          minYear = Math.min(minYear, currentYear);
          maxYear = Math.max(maxYear, currentYear);
        }

        // Update year range or maintain single year if applicable
        const yearRange =
          minYear && maxYear && minYear !== maxYear
            ? `${minYear}-${maxYear}`
            : (maxYear || minYear).toString();

        // Compare and set 'various' if different, sum durations
        return {
          id: acc.id + ", " + song.id, // IDs are always unique
          trackNumber:
            acc.trackNumber === song.trackNumber?.toString()
              ? song.trackNumber.toString()
              : "Various",
          title: acc.title === song.title ? song.title : "Various",
          artist: acc.artist === song.artist ? song.artist : "Various",
          albumTitle:
            acc.albumTitle === song.albumTitle ? song.albumTitle : "Various",
          albumArtist:
            acc.albumArtist === song.albumArtist
              ? song.albumArtist
              : "Various Artists",
          year: yearRange,
          genre: acc.genre === song.genre ? song.genre : "Various",
          duration: (parseInt(acc.duration) + song.duration).toString(), // Sum durations
          image: acc.image === song.image ? song.image : "Various",
        };
      }
    },
    // set initial acc val
    {
      id: "Various",
      trackNumber: "Various",
      title: "Various",
      artist: "Various",
      albumTitle: "Various",
      albumArtist: "Various",
      year: "Various",
      genre: "Various",
      duration: "0", // Initialize duration as '0'
      image: "Various",
    }
  );
}

// NOTE: the duration isn't actually used, we use the calculateTotalDuration function instead.
