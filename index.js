import { XernerxShardClient } from 'xernerx';
import express from 'express';
import * as fs from 'fs';
import tokens from './data/tokens.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const shell = promisify(exec);

const bots = Object.entries(tokens);
const app = express();
const data = {};

const dataLog = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    const table = Object.entries(data)
        .map(([bot, stats]) => `<tr><td class="bot">${bot}</td><td>${stats.guildCount}</td><td>${stats.userCount}</td><td>${stats.shardCount}</td></tr>`)
        .join('');

    response.render('index', { table, data });
});

(async () => {
    await shell('mkdir bots').catch((e) => e);

    for (const [bot, token] of bots) {
        if (!token) {
            console.warn(`No token for ${bot} provided. Skipping...`);
            continue;
        }

        console.info(`Starting ${bot}!`);

        console.info(`Updating ${bot} code`);

        fs.writeFileSync(`./bots/${bot}.js`, `import { Client } from '../main.js';\nimport tokens from '../data/tokens.js';\n\nconst client = new Client();\nclient.login(tokens.${bot});`);

        let { shards, stats } = new XernerxShardClient(`./bots/${bot}.js`, { token, respawn: true }, { log: { info: true } });

        shards = await shards;

        const collector = setInterval(() => {
            if (shards.get(shards.size - 1).ready) {
                clearInterval(collector);

                data[bot] = stats;

                if (bots.filter((bot) => bot.at(1)).length == Object.keys(data).length) {
                    console.table(data);

                    dataLog[Number(Date.now())] = data;

                    // ! _______________________________________________________

                    // * Checks all pre-existing bots that have recorded data.
                    let botList = Object.keys(dataLog[Object.keys(dataLog)[Object.keys(data).length - 1]]);

                    // * Checks for new bots, if so, add it to the botList.
                    Object.keys(data).map((bot) => (!botList.includes(bot) ? botList.push(bot) : null));

                    // * Sorts the botList, as it's defaulted to the token order provided.
                    botList = botList.sort();

                    // * Make a new object that'll sort the data values correctly, otherwise I'd had to work with delete key (that's a good idea...)
                    Object.entries(dataLog).map(([timestamp, data]) => {
                        const botData = {};

                        botList.map((bot) => {
                            if (data[bot]) botData[bot] = data[bot];
                            else botData[bot] = {};
                        });

                        // * Assign the new sorted data object to the correct timestamp.
                        dataLog[timestamp] = botData;
                    });
                    // ! _______________________________________________________

                    fs.writeFileSync('./data/data.json', JSON.stringify(dataLog), console.error);

                    console.info('Ending processes...');

                    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                        console.info(`Processes ended.`);
                        process.exit();
                    });
                } else console.info(`Done with ${bot}, loading next one...`);
            }
        }, 1000);
    }
})();

app.listen(4444);
