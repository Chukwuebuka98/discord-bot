require('dotenv').config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: 'Under Ctrl',
    type: ActivityType.Streaming,
    url: 'https://www.twitch.tv/underctrl',
  },
  {
    name: 'Custom status 1',
  },
  {
    name: 'Custom status 2',
    type: ActivityType.Watching,
  },
  {
    name: 'Custom status 3',
    type: ActivityType.Listening,
  },
];

client.on('ready', (c) => {
  console.log(`🤖 Logged in as ${c.user.tag}`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, (interval = 10000));
});

client.login(process.env.TOKEN);
