const { FluxDispatcher: Dispatcher, getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { Plugin } = require('powercord/entities');

const isPremium = getModule(['isSpotifyPremium'], false);
const Profile = getModule(['getProfile'], false);

module.exports = class extends Plugin {
   startPlugin() {
      inject('spotify-crack', Profile, 'getProfile', async function (args) {
         inject('spotify-crack1', isPremium, 'isSpotifyPremium', async function (_) {
            return true;
         });
         Dispatcher.dispatch({ type: 'SPOTIFY_PROFILE_UPDATE', accountId: args[0], isPremium: true });
         uninject('spotify-crack1');
         return;
      });
   }

   pluginWillUnload() {
      uninject('spotify-crack');
      uninject('spotify-crack1');
   }
};
