const Discord = require("discord.js");

module.exports = {
    name: "kakao",
    aliases: ["카카오"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Kakao', 'https://www.kakaocorp.com/resources/favicon.ico')
            .setColor(0xffff00)
            .setTitle('들어가기')
            .setURL('https://www.kakaocorp.com/')
        message.channel.send(embed);
    }
}