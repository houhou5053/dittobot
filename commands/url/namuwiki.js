const Discord = require("discord.js");

module.exports = {
    name: "namuwiki",
    aliases: ["나무위키"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('나무위키', 'https://images-ext-2.discordapp.net/external/UsxxmhuCamjpla6uTQQxG9SkTZxvZwydEE3PcDjObwY/https/katex.org/img/namuwiki_logo.png')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://namu.wiki/')
        message.channel.send(embed);
    }
}