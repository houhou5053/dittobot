const request = require("request")
const Discord = require("discord.js")

module.exports = {
    name: "2b2t",
    aliases: ["2b2t 대기목록"],
    run: async (client, message, args) => {
        var url = 'https://rebane2001.com/queuepeek/data.json'

        const embed = new Discord.RichEmbed()
            .setTitle('2b2t 서버 정보')
            .setColor(0xffff00)
            .setTimestamp()
            .setThumbnail('https://preview.redd.it/bs3yxl981t031.png?width=960&crop=smart&auto=webp&s=589b379ad98699e747da801ba7e6fc09d06f143e')

        request(url, function(error, ddd, html) {
            if (!error) {
                embed.setDescription(`**대기자**\n${JSON.parse(html, null, 1).queuepos}명\n\n**대기 시간**\n${JSON.parse(html, null, 1).queueest.replace(/h/gi, '시간').replace(/m/gi, '분')}`)
                message.channel.send(embed)
            }
        })
    }
}