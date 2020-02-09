const Discord = require("discord.js");

module.exports = {
    name: "namuwiki",
    aliases: ["나무위키"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('나무위키')
            .setURL('https://namu.wiki/')
        message.channel.send(embed);
    }
}