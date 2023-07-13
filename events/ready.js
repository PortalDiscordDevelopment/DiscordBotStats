import { XernerxEvent } from 'xernerx';

export default class ReadyEvent extends XernerxEvent {
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
