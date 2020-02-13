const Discord = require("discord.js");

module.exports = {
    name: "papago",
    aliases: ["파파고"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x0000ff)
            .setTitle('들어가기')
            .setAuthor('Papago', 'https://papago.naver.com/favicon.ico')
            .setURL('https://papago.naver.com/')
        message.channel.send(embed);
    }
}