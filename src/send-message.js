require('dotenv').config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: '1389331816435155135',
    label: 'Red',
  },
  {
    id: '1389331939478995177',
    label: 'Green',
  },
  {
    id: '1389332056072388738',
    label: 'Blue',
  },
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1389333391014498558');
    if (!channel) return;

    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    channel.send({
      content: 'Claim or remove a role below',
      components: [row],
    });
  } catch (error) {
    console.error('Error during client initialization:', error);
  }
});

client.login(process.env.TOKEN);
