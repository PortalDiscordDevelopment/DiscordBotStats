import { Client } from '../main.js';
import tokens from '../data/tokens.js';

/**
 ** Creates the instance of the bot.
 */
const client = new Client();

client.login(tokens.RobloxUtilities);
