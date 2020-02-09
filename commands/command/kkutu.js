const Discord = require("discord.js");

module.exports = {
    name: "끄투코리아",
    aliases: ["끄코"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0xfffffe)
            .setTitle('끄투코리아')
            .setURL('https://kkutu.co.kr/')
        message.channel.send(embed);
    }
}