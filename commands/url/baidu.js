const Discord = require("discord.js");

module.exports = {
    name: "baidu",
    aliases: ["바이두", "百度"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Baidu', 'https://www.baidu.com/favicon.ico')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://www.baidu.com/')
        message.channel.send(embed);
    }
}