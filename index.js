const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const handler = require('./utils/handler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
});
const Discord = require('discord.js');

client.discord = Discord;
client.commands = new Collection();

handler.loadEvents(client);
handler.loadCommands(client);

client.login(process.env.TOKEN);