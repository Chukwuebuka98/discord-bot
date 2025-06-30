require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'embed',
    description: 'Create an embed message',
    // options: [
    //   {
    //     name: 'title',
    //     description: 'The title of the embed',
    //     type: ApplicationCommandOptionType.String,
    //     required: true,
    //   },
    //   {
    //     name: 'description',
    //     description: 'The description of the embed',
    //     type: ApplicationCommandOptionType.String,
    //     required: true,
    //   },
    //   {
    //     name: 'color',
    //     description: 'The color of the embed',
    //     type: ApplicationCommandOptionType.String,
    //     required: true,
    //     choices: [
    //       {
    //         name: 'Red',
    //         value: 'RED',
    //       },
    //       {
    //         name: 'Green',
    //         value: 'GREEN',
    //       },
    //       {
    //         name: 'Blue',
    //         value: 'BLUE',
    //       },
    //     ],
    //   },
    // ],
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
