import { XernerxBuilder } from 'xernerx';

export default class ReadyEvent extends XernerxBuilder {
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
