import db from "./data/database";
import { Client, GatewayIntentBits, ChannelType, TextChannel } from "discord.js";
import { config } from "dotenv";
import { createTopics } from "./commands/createTopics";
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

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const MessageContent = message.content.toLowerCase().trim();
  const MessageCommands = MessageContent.split('$');

  if (MessageCommands.length < 2) {
    return;
  }
  
  const firstCommand = MessageCommands[1].trim();

  if (firstCommand === 'create') {
    const rpgName = MessageCommands[2].trim();
    if (rpgName) {
      if (MessageCommands.length < 4) {
        const topics = MessageCommands[3].trim();
        if (topics) {
          await message.reply(createRPG(rpgName, message.author.id, topics));
        }
      } else {
        if (message.channel.type !== ChannelType.GuildText) {
          return await message.reply("This command can only be used in text channels.");
        }

        const sentMessage = await message.channel.send(`Are you sure you want to create the RPG **${rpgName}** topics in channel ${message.channel}? React with ✅ in 4s to confirm.`);
        sentMessage.react('✅');

        setTimeout(() => {
          const hasReacted = sentMessage.reactions.cache.get('✅')?.users.cache.has(message.author.id);

          if (hasReacted) {
            const topics = createTopics(rpgName);
            
            if (!topics) {
              return message.channel.send(`No topics found for RPG **${rpgName}**.`);
            }

            const textChannel = message.channel as TextChannel;

            topics.forEach(topic => {
              textChannel.threads.create({
                name: topic,
                autoArchiveDuration: Number.MAX_VALUE, // Archive after 60 minutes of inactivity
                reason: `Creating topic for RPG ${rpgName}`,
                type: ChannelType.PublicThread,
                invitable: true,
                startMessage: `${textChannel.name} - ${topic}`
              })
            });
          } else {
            message.channel.send(`You did not confirm the creation of Topics from **${rpgName}** in time.`);
          }
        }, 4000);
      }
    }
  }

  if (firstCommand === 'list') {
    await message.reply(listRPGs());
  }
});

client.login(process.env.TOKEN);