import { XernerxShardClient } from 'xernerx';

import tokens from './data/tokens.js';

const bots = Object.entries(tokens);

/**
 ** Put the imported bots inside the array, order doesn't matter, the bot will take time to sign in by its server count.
 */

(async () => {
    for (const [bot, token] of bots) {
        if (!token) continue;

        console.info(`Starting ${bot}!`);

        const client = new XernerxShardClient(`./bots/${bot}.js`, { token, respawn: true }, { log: { info: true } });

        await client;

        console.info(`Done with ${bot}, loading next one...`);
    }
})();
