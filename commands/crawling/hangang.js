const request = require("request")
const Discord = require("discord.js")

module.exports = {
    name: "hangang",
    aliases: ["한강온도", "한강수온", "한강"],
    category: 'crawling',
    run: async (client, message, args) => {
        var url = 'http://hangang.dkserver.wo.tc/'

        request(url, function(error, dd, html) {
            if (!error) {
                const embed = new Discord.RichEmbed()
                    .setTitle('한강')
                    .setColor(0x00ffff)
                    .setTimestamp()
                    .setDescription(`**한강의 수온**\n${JSON.parse(html, null, 1).temp}℃\n(${JSON.parse(html, null, 1).time} 기준)`)
                message.channel.send(embed)
            }
        })
    }
}