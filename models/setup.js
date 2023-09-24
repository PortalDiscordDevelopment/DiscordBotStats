import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import log from './log.js';

const config = JSON.stringify({
    rate: 3600000,
    guildId: 'Insert Your Guild ID here',
    tokens: {},
});

(async () => {
    const shell = promisify(exec);

    await shell('mkdir data').catch(() => true);

    const dir = fs.readdirSync('./data');

    log('Installing dependencies...');

    await shell('npm i');

    log('Dependencies installed!');

    log('Funding creators...');

    await shell('npm fund');

    log('Creators funded!');

    log('Building files...');

    await shell('npx prettier --write .');

    log('Checking for data file...');

    if (!dir.includes('data.json')) {
        log('Data file not existant, creating one.', 'error');
        await shell('echo {} > ./data/data.json');
    } else log('Data file found!');

    log('Checking for config file...');

    if (!dir.includes('config.json')) {
        log('Config file not existant, creating one.', 'error');
        await shell(`echo ${config} > ./data/config.json`);

        log('Navigate over to ./data/config.json and add your bots and tokens and the local guild id!');
    } else log('Config file found!');

    log('Finished building files!');
})();
