declare const wp: any;

export const environment = {
  production: true,
  spotifySearchApiUrl: 'https://17w8hco3h7.execute-api.us-west-2.amazonaws.com/v1',
  spotifySearchApiKey: wp.env.SPOTIFY_SEARCH_API_KEY
};
