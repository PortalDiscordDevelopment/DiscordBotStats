/**
 ** Making use of xernerx for ease of access.
 */
import XernerxClient from 'xernerx';

import config from './data/config.json' assert { type: 'json' };
/**
 ** Import any bot token token from the token file.
 **
 *! Make sure to make a token file, an example can be found in data/token.example.js.
 */

export class Client extends XernerxClient {
    constructor() {
        super(
            {
                intents: ['Guilds'], // The intents of the bot.
            },
            {
                global: false, // Whether the bot is loaded globally or locally
                local: config.guildId, // The developer guild.
                log: {
                    ready: true, // Log when the bot is ready and logged in.
                    error: true, // Log when an internal error occurs.
                    info: true, // Log when there is any other type of information.
                },
            }
        );

        /**
         ** Events are solely loaded for a presence update to be invisible, you can edit this event in events/ready.js.
         */
        this.modules.eventHandler.loadEvents({
            directory: './events',
        });
    }
}
