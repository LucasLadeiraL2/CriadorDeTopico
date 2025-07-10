import db from "./data/database";
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
//import { createTopics } from "./commands/createTopics";
//import { createRPG } from "./commands/createRPG";
//import { deleteRPG } from "./commands/deleteRPG";
//import { listRPGs } from "./commands/listRPGs";
//import { updateRPG } from "./commands/updateRPG";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login(process.env.TOKEN);