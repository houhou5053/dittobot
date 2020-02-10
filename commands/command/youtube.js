const Discord = require("discord.js");

module.exports = {
    name: "유튜브",
    aliases: ["youtube"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setTitle('YouTube')
            .setAuthor('YouTube', 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png')
            .setURL('https://www.youtube.com/')
        message.channel.send(embed);
    }
}