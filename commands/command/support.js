const Discord = require("discord.js");

module.exports = {
    name: "서포트",
    aliases: ["support"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('디토봇 서포트')
            .setURL('https://discord.gg/JvHBVjF')
        message.channel.send(embed);
    }
}