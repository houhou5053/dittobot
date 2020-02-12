const Discord = require("discord.js");

module.exports = {
    name: "파파고",
    aliases: ["papago"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x0000ff)
            .setTitle('들어가기')
            .setAuthor('Papago', 'https://papago.naver.com/favicon.ico')
            .setURL('https://papago.naver.com/')
        message.channel.send(embed);
    }
}