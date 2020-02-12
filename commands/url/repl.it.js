const Discord = require("discord.js");

module.exports = {
    name: "repl.it",
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Repl.it', 'https://repl.it/public/images/favicon.ico')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://repl.it/')
        message.channel.send(embed);
    }
}