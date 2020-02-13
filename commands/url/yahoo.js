const Discord = require("discord.js");

module.exports = {
    name: "yahoo",
    aliases: ["야후", "ヤフ"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Yahoo', 'https://s.yimg.com/rz/l/favicon.ico')
            .setColor(0xff00ff)
            .setTitle('들어가기')
            .setURL('https://www.yahoo.com/')
        message.channel.send(embed);
    }
}