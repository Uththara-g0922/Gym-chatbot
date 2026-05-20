// moodPlaylist.js

const moodPlaylists = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
  tired: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
  motivated: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
  stressed: "https://open.spotify.com/playlist/37i9dQZF1DWUvHZA1zLcjW",
  excited: "https://open.spotify.com/playlist/37i9dQZF1DX1g0iEXLFycr",
};

function getMoodPlaylistResponse(message) {
  const lower = message.toLowerCase();
  const moodMatch = lower.match(/(?:i\s*(?:am|feel|am feeling|feeling)\s*)(\w+)/);
  if (moodMatch) {
    const mood = moodMatch[1];
    if (moodPlaylists[mood]) {
      return `🎧 Based on your mood, here's a playlist:<br><a href="${moodPlaylists[mood]}" target="_blank">Listen on Spotify</a>`;
    } else {
      return `Hmm, I couldn't find a playlist for "${mood}". Want to suggest one?`;
    }
  }
  return null;
}

window.getMoodPlaylistResponse = getMoodPlaylistResponse;
