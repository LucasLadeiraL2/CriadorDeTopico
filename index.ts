import db from "./data/database";
import { Client, GatewayIntentBits, Message } from "discord.js";
import { config } from "dotenv";
//import { createTopics } from "./commands/createTopics";
import { createRPG } from "./commands/createRPG";
//import { deleteRPG } from "./commands/deleteRPG";
import { listRPGs } from "./commands/listRPGs";
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
  const MessageContent = message.content.toLowerCase().trim();
  const MessageCommands = MessageContent.split('$');
  const firstCommand = MessageCommands[1].trim();
  console.log(`Received command: ${firstCommand}`);

  if (firstCommand === 'create') {
    const rpgName = MessageCommands[2].trim();
    if (rpgName) {
      const topics = MessageCommands[3].trim();
      if (topics) {
        message.reply(createRPG(rpgName, message.author.id, topics));
      }
    }
  }

  if (firstCommand === 'list') {
    message.reply(listRPGs());
  }
});

client.login(process.env.TOKEN);