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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  await interaction.deferReply({ ephemeral: true });

  const role = interaction.guild.roles.cache.get(interaction.customId);
  if (!role) {
    interaction.editReply({ content: 'Role not found.' });
    return;
  }

  const hasRole = interaction.member.roles.cache.has(role.id);
  if (hasRole) {
    await interaction.member.roles.remove(role);
    await interaction.editReply(
      `The role **${role}** has been removed from you.`
    );
    return;
  }

  await interaction.member.roles.add(role);
  await interaction.editReply(`The role **${role}** has been added to you.`);
});

client.login(process.env.TOKEN);
