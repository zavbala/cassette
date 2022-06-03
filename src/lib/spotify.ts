const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const basic = btoa(`${client_id}:${client_secret}`);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  return response.json();
};

export const fetcher = async (endpoint: string) => {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method: "GET",
    headers: new Headers({
      Authorization: window.localStorage.getItem("token") as string,
      "Content-Type": "application/json",
    }),
  });

  try {
    return await res.json();
  } catch (error) {
    return [];
  }
};
