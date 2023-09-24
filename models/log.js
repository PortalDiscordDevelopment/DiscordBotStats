import { Style } from 'xernerx';

const start = Number(Date.now());
export default function log(message, type = 'info') {
    const ram = Math.round(process.memoryUsage().rss / 1000000);

    const string = `${Style.log(new Date().toLocaleTimeString(), { color: Style.TextColor.Yellow })} | ${Style.log(Number(Date.now()) - start, { color: Style.TextColor.LightBlue })}ms | ${Style.log(
        ram,
        { color: Style.TextColor.LightGreen }
    )}MB`;

    if (type == 'error') {
        console.error(`${Style.log(`❗ | Stats`, { color: Style.TextColor.Red })} | ${string} | ${Style.log(message, { color: Style.TextColor.LightGrey })}`);
    } else {
        console.info(`${Style.log(`✔️ | Stats`, { color: Style.TextColor.Purple })} | ${string} | ${Style.log(message, { color: Style.TextColor.LightGrey })}`);
    }
}
