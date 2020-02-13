const Discord = require("discord.js");

module.exports = {
    name: "youtube",
    aliases: ["유튜브"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setTitle('들어가기')
            .setAuthor('YouTube', 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png')
            .setURL('https://www.youtube.com/')
        message.channel.send(embed);
    }
}