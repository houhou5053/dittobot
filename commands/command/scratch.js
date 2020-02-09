const Discord = require("discord.js");

module.exports = {
    name: "scratch",
    aliases: ["스크래치"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('Scratch')
            .setURL('https://scratch.mit.edu/')
        message.channel.send(embed);
    }
}