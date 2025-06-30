require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add') {
    const firstNumber = options.getNumber('first-number');
    const secondNumber = options.getNumber('second-number');
    const sum = firstNumber + secondNumber;
    await interaction.reply(`The sum is ${sum}`);
  } else {
    await interaction.reply({ content: 'Unknown command', ephemeral: true });
  }
});

client.login(process.env.TOKEN);
