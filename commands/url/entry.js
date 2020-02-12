const Discord = require("discord.js");

module.exports = {
    name: "엔트리",
    aliases: ["entry"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setAuthor('Entry', 'https://playentry.org//img/icons/favicon.ico')
            .setTitle('들어가기')
            .setURL('https://playentry.org/')
        message.channel.send(embed);
    }
}