# Discord Bots Stats

## About

This program can be used to save stats of a list of bots, as many as you want!

## How to use

All you need to do is it's initial [setup](#setup), or run the start.bat file. Everything else is done for you, once the script has finished your first data record can be found in [the data file](./data/data.json).

## Setup

You can run it once to have most of the setup done for you, however there is one thing you **must** do in order for the program to run.

After you ran it once you need to navigate to the [data folder](./data) and will see a [config.json](./data/config.json), if you don't see it, run the program once, or create it yourself.

In this config file you'll see the following boilerplate code:

```json
{
    "rate":3600000,
    "guildId":"Insert Your Guild ID here",
    "tokens":{}
} 
```
If you don't see this, copy and paste the code into the config.json. Once you're there change the `guildId` to the guild that all your bots share, **ALL BOTS ARE MANDATORY TO JOIN THIS GUILD!**

for tokens you'll just prefix the bot name and then it's token.
```json
{
    "BotName":"BotToken"
}
```
