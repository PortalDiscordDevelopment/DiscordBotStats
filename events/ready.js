import { EventBuilder } from 'xernerx';

export default class ReadyEvent extends EventBuilder {
	constructor() {
		super('ready', {
			name: 'ready',
		});
	}

	async run(client) {
		client.user.setPresence({
			status: 'invisible',
		});
	}
}
