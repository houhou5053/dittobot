const Discord = require("discord.js");

module.exports = {
    name: "kkutukorea",
    aliases: ["끄코", "끄투코리아"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('끄투 코리아', 'https://cdn.kkutu.co.kr/img/main/logo.png')
            .setColor(0xfffffe)
            .setTitle('들어가기')
            .setURL('https://kkutu.co.kr/')
        message.channel.send(embed);
    }
}