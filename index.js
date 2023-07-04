import { XernerxShardClient } from 'xernerx';
import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

import tokens from './data/tokens.js';

const bots = Object.entries(tokens);
const app = express();
const data = {};

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    const table = Object.entries(data)
        .map(([bot, stats]) => `<tr><td class="bot">${bot}</td><td>${stats.guildCount}</td><td>${stats.userCount}</td><td>${stats.shardCount}</td></tr>`)
        .join('');

    response.render('index', { table, data });
});

/**
 ** Put the imported bots inside the array, order doesn't matter, the bot will take time to sign in by its server count.
 */

(async () => {
    for (const [bot, token] of bots) {
        if (!token) continue;

        console.info(`Starting ${bot}!`);

        let { shards, stats } = new XernerxShardClient(`./bots/${bot}.js`, { token, respawn: true }, { log: { info: true } });

        shards = await shards;

        const collector = setInterval(() => {
            if (shards.get(shards.size - 1).ready) {
                clearInterval(collector);

                data[bot] = stats;

                if (bots.length == Object.keys(data).length) {
                    console.table(data);

                    const dataLog = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

                    dataLog[Number(Date.now())] = data;

                    fs.writeFileSync('./data/data.json', JSON.stringify(dataLog), (err) => err);
                } else console.info(`Done with ${bot}, loading next one...`);
            }
        }, 1000);
    }
})();

app.listen(4444);