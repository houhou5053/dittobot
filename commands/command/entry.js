const Discord = require("discord.js");

module.exports = {
    name: "엔트리",
    aliases: ["entry"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('엔트리')
            .setURL('https://playentry.org/')
            .setDescription('**소프트웨어 교육의 첫걸음, 엔트리.**')
        message.channel.send(embed);
    }
}