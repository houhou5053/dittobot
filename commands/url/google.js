const Discord = require("discord.js")

module.exports = {
    name: "google",
    aliases: ["구글"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Google', 'https://www.google.co.kr/images/branding/googleg/1x/googleg_standard_color_128dp.png')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://google.com/')
        message.channel.send(embed);
    }
}