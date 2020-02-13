const Discord = require("discord.js");

module.exports = {
    name: "bing",
    aliases: ["빙"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Bing', 'https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://www.bing.com/')
        message.channel.send(embed);
    }
}