const request = require("request")
const Discord = require("discord.js")

module.exports = {
    name: "한강",
    aliases: ["한강온도", "한강수온"],
    run: async (client, message, args) => {
        var url = 'http://hangang.dkserver.wo.tc/'

        request(url, function(error, dd, html) {
            if (!error) {
                const embed = new Discord.RichEmbed()
                    .setThumbnail('https://postfiles.pstatic.net/20140326_75/vartist_1395844965258bOTJj_JPEG/R1024_140326_%C7%D1%B0%AD%BE%DF%B0%E6_11T.JPG?type=w3')
                    .setTitle('한강')
                    .setColor(0x00ffff)
                    .setTimestamp()
                    .setDescription(`**한강의 수온**\n${JSON.parse(html, null, 1).temp}℃\n(${JSON.parse(html, null, 1).time} 기준)`)
                message.channel.send(embed)
            }
        })
    }
}