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
      if (MessageCommands.length == 4) {
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

        setTimeout(async () => {
          const reaction = sentMessage.reactions.cache.get('✅');
          if (!reaction) return await message.channel.send('Nenhuma reação encontrada.');

          await reaction.users.fetch();

          const hasReacted = reaction.users.cache.has(message.author.id);

          if (hasReacted) {
            const topics = createTopics(rpgName);
            
            console.log(topics);

            if (!topics) {
              return await message.channel.send(`No topics found for RPG **${rpgName}**.`);
            }

            const textChannel = message.channel as TextChannel;

            for (const topic of topics) {
              await textChannel.setTopic(topic, `${textChannel.name} - ${topic}`);
            }
          } else {
            await message.channel.send(`You did not confirm the creation of Topics from **${rpgName}** in time.`);
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