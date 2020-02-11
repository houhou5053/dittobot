const request = require("request")
const cheerio = require("cheerio")
const Discord = require("discord.js")

module.exports = {
    name: "한강",
    aliases: ["한강온도"],
    run: async (client, message, args) => {
        var url = 'https://www.wpws.kr/hangang/'

        request(url, function(error, html) {
            var $ = cheerio.load(html)

            $('div#content > p#temp').each(function() {
                var title = $(this)
                var text = title.text()
                console.log(text)
            })
        })
    }
}