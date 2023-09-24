import { Style } from 'xernerx';

const start = Number(Date.now());
export default function log(message, type = 'info') {
    const ram = Math.round(process.memoryUsage().rss / 1000000);

    const string = `${new Date().toLocaleTimeString()} | ${Number(Date.now()) - start}ms. | ${ram}MB.`;

    if (type == 'error') {
        console.error(`${Style.log(`❗ | Stats`, { color: Style.TextColor.Red })} | ${string} | ${message}`);
    } else {
        console.info(`${Style.log(`✔️ | Stats`, { color: Style.TextColor.Purple })} | ${string} | ${message}`);
    }
}
