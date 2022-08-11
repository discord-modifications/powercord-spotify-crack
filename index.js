const { FluxDispatcher: Dispatcher, getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { Plugin } = require('powercord/entities');

const Spotify = getModule(['isSpotifyPremium'], false);
const Profile = getModule(['getProfile'], false);

module.exports = class extends Plugin {
   startPlugin() {
      inject('spotify-crack-is', Spotify, 'isSpotifyPremium', () => Promise.resolve(true));

      Spotify._ensureSpotifyPremium = Spotify.ensureSpotifyPremium;
      Spotify.ensureSpotifyPremium = () => Promise.resolve(true);

      inject('spotify-crack', Profile, 'getProfile', async (args) => {
         Dispatcher.dispatch({ type: 'SPOTIFY_PROFILE_UPDATE', accountId: args[0], isPremium: true });
      });
   }

   pluginWillUnload() {
      uninject('spotify-crack');
      uninject('spotify-crack-is');
      
      Spotify.ensureSpotifyPremium = Spotify._ensureSpotifyPremium
   }
};
