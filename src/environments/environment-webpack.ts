import { Configuration, DefinePlugin } from 'webpack';

/**
 * This is where you define additional webpack configurations
 * to be appended to the webpack config.
 */
export default {
  plugins: [
    new DefinePlugin({
      'wp.env': {
        SPOTIFY_SEARCH_API_KEY: JSON.stringify(process.env.SPOTIFY_SEARCH_API_KEY)
      }
    })
  ]
} as Configuration;
