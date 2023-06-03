import { XernerxShardClient } from 'xernerx';

import tokens from './data/tokens.js';

const bots = Object.entries(tokens);

/**
 ** Put the imported bots inside the array, order doesn't matter, the bot will take time to sign in by its server count.
 */
// export const bots = [Amplifier, ChannelManager, Essence, Metamorphosis, RobloxUtilities, SupercellUtilities, PortalQuiz, YourApps, Zodiac];

for (const [bot, token] of bots) {
    if (!token) continue;

    console.info(`Starting ${bot}!`);

    new XernerxShardClient(`./bots/${bot}.js`, { token }, { log: { info: true } });
}
