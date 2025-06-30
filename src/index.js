require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Embed Title')
      .setDescription('Embed Description')
      .setColor(0xff5733)
      .addFields(
        {
          name: 'Field 1',
          value: 'This is the value of field 1',
          inline: true,
        },
        { name: 'Field 2', value: 'This is the value of field 2', inline: true }
      );
    interaction.reply({ embeds: [embed] });
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Embed Title')
      .setDescription('Embed Description')
      .setColor(0xff5733)
      .addFields(
        {
          name: 'Field 1',
          value: 'This is the value of field 1',
          inline: true,
        },
        { name: 'Field 2', value: 'This is the value of field 2', inline: true }
      );
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
