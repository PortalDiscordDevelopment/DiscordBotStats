import { XernerxShardClient } from 'xernerx';

import tokens from './data/tokens.js';

const bots = Object.entries(tokens);

const data = {};

/**
 ** Put the imported bots inside the array, order doesn't matter, the bot will take time to sign in by its server count.
 */

(async () => {
    let i = 0;

    for (const [bot, token] of bots) {
        i++;

        if (!token) continue;

        console.info(`Starting ${bot}!`);

        let { shards, stats } = new XernerxShardClient(`./bots/${bot}.js`, { token, respawn: true }, { log: { info: true } });

        shards = await shards;

        const collector = await setInterval(() => {
            if (shards.get(shards.size - 1).ready) {
                clearInterval(collector);

                data[bot] = stats;

                if (i == bots.length) console.table(data);
                else console.info(`Done with ${bot}, loading next one...`);
            }
        }, 1000);
    }
})();
