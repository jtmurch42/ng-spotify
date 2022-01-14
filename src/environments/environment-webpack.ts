import { Configuration, DefinePlugin } from 'webpack';

/**
 * This is where you define additional webpack configurations
 * to be appended to the webpack config.
 */
export default {
  plugins: [
    new DefinePlugin({
      'wp.env': {
        NG_SPOTIFY_API_KEY: JSON.stringify(process.env.NG_SPOTIFY_API_KEY)
      }
    })
  ]
} as Configuration;
