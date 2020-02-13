const request = require('request');
const Discord = require("discord.js");

module.exports = {
    name: "네이버실검",
    aliases: ["실시간 검색어", "실검"],
    category: 'crawling',
    run: async (client, message, args) => {    
        var url = 'https://www.naver.com/srchrank?frm=main'

        const embed = new Discord.RichEmbed()
            .setAuthor('Naver', 'https://images-ext-2.discordapp.net/external/42ygoEiRXm11O1d1fr9HLm5qcr0avgCd7zquMYh-9jU/http/pluspng.com/img-png/naver-logo-png-naver-300.png')
            .setTitle('네이버 실시간 검색어')
            .setColor(0x00ff00)
            .setTimestamp()

        request(url, function(error, tlfrja, html) {
            if (!error) {
                for (var i = 0; i < 20; i++) {
                    embed.addField(`${i+1}위`, `[${JSON.parse(html, null, 1).data[i].keyword}](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${JSON.parse(html, null, 1).data[i].keyword.replace(/ /gi, '+')})`)
                }

                message.channel.send(embed)
            }
        })
    }
}