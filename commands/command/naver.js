const Discord = require("discord.js");

module.exports = {
    name: "네이버",
    aliases: ["naver"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('Naver')
            .setURL('https://www.naver.com/')
        message.channel.send(embed);
    }
}