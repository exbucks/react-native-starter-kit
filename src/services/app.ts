import axios from "axios";

interface appResponse {
  lyrics: string;
}

export async function fetchLyrics(
  artist: string,
  song: string
): Promise<appResponse> {
  return await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}
