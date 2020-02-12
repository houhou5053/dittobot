const Discord = require("discord.js");

module.exports = {
    name: "scratch",
    aliases: ["스크래치"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Scratch', 'https://scratch.mit.edu/favicon.ico')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://scratch.mit.edu/')
        message.channel.send(embed);
    }
}