const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'YOUR_DISCORD_BOT_TOKEN';
const allowedUsers = ['user1#1234', 'user2#5678']; // List of allowed users

let points = {}; // Object to store user points

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return; // Ignore messages that don't start with "!"

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'addpoints') {
    if (!allowedUsers.includes(message.author.tag)) {
      return message.reply("Sorry, you're not authorized to use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to add points.');
    }

    const userTag = user.tag;
    points[userTag] = points[userTag] || 0;
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid number of points to add.');
    }

    points[userTag] += amount;
    return message.channel.send(`${amount} Tellinq points added to ${userTag}.`);
  }

  if (command === 'removepoints') {
    if (!allowedUsers.includes(message.author.tag)) {
      return message.reply("Sorry, you're not authorized to use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to remove points.');
    }

    const userTag = user.tag;
    points[userTag] = points[userTag] || 0;
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid number of points to remove.');
    }

    if (points[userTag] < amount) {
      return message.reply("You can't remove more points than the user has.");
    }

    points[userTag] -= amount;
    return message.channel.send(`${amount} Tellinq points removed from ${userTag}.`);
  }

  if (command === 'checkpoints') {
    const user = message.mentions.users.first() || message.author;
    const userTag = user.tag;
    points[userTag] = points[userTag] || 0;
    return message.channel.send(`${userTag} has ${points[userTag]} Tellinq points.`);
  }
});

client.login(token);
