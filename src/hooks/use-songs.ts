import { useEffect, useState } from "react";
import type { Song } from "../types/song";

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  
  useEffect(() => {
    const controller = new AbortController();
  
    fetch("/songs.json", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: Song[]) => {
        setSongs(data.map((song) => ({
          ...song,
          lowerCaseName: song.name.toLowerCase(),
          lowerCaseArtists: song.artists.toLowerCase(),
        })));
      });
  
    return () => controller.abort();
  }, []);

  return { songs };
}