import log from './log.js';
import { promisify } from 'util';
import { exec } from 'child_process';

log(`Updating data file.`);

const shell = promisify(exec);

shell('npx prettier --write data/data.json');

log(`Updated data file!`);
