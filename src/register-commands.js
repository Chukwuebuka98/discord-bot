require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'add',
    description: 'Add a two numbers',
    options: [
      {
        name: 'first-number',
        description: 'The first number',
        choices: [
          {
            name: 'One',
            value: 1,
          },
          {
            name: 'Two',
            value: 2,
          },
          {
            name: 'Three',
            value: 3,
          },
        ],
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: 'second-number',
        description: 'The second number',
        choices: [
          {
            name: 'One',
            value: 1,
          },
          {
            name: 'Two',
            value: 2,
          },
          {
            name: 'Three',
            value: 3,
          },
        ],
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
