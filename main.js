/**
 ** Making use of xernerx for ease of access.
 */
import XernerxClient, { XernerxLog } from 'xernerx';

/**
 ** Import any bot token token from the token file.
 **
 *! Make sure to make a token file, an example can be found in data/token.example.js.
 */
import { Metamorphosis, SupercellUtilities, YourApps } from './data/tokens.js';

/**
 ** Put the imported bots inside the array, order doesn't matter, the bot will take time to sign in by its server count.
 */
const bots = [Metamorphosis, SupercellUtilities, YourApps];

for (const bot of bots) {
	class Client extends XernerxClient {
		constructor() {
			super(
				{
					intents: ['Guilds'], // The intents of the bot.
				},
				{
					global: false, // Whether the bot is loaded globally or locally
					local: '916752657413181450', // The developer guild.
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

			/**
			 ** logs the bot in.
			 */
			this.connect(bot);
		}
	}

	try {
		/**
		 ** Creates the instance of the bot.
		 */
		const client = new Client();

		new XernerxLog(client).info(`Starting bot with token: ${bot}`);
	} catch (error) {
		console.error(error);
	}
}
