import { Album, Song } from "../types/types";

export function calculateTotalDuration(songs: Song[]): string {
  try {
    const totalSeconds = songs.reduce((acc, song) => {
      return acc + parseInt(song.duration);
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format duration string
    return `${hours > 0 ? `${hours} hr ` : ""}${minutes} min ${seconds} sec`;
  } catch (error) {
    console.error("Error calculating total duration:", error);
    return "";
  }
}

export function convertTime(songDuration: string): string {
  // Parse duration as integer seconds from the string
  const totalSeconds = parseInt(songDuration, 10);

  if (isNaN(totalSeconds)) {
    return ""; // Return empty string if the duration is not a number
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Build the time string conditionally
  let timeString = "";
  if (hours > 0) {
    timeString += hours + ":"; // Append hours without leading zero
  }
  if (minutes > 0 || hours > 0) {
    // Append minutes, pad with leading zero if hours are present
    timeString +=
      (hours > 0 ? minutes.toString().padStart(2, "0") : minutes) + ":";
  }
  // Append seconds, pad with leading zero if minutes or hours are present
  timeString +=
    minutes > 0 || hours > 0 ? seconds.toString().padStart(2, "0") : seconds;

  return timeString;
}
