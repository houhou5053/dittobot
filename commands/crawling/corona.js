const Discord = require("discord.js")
const cheerio = require("cheerio")
const request = require("request")

module.exports = {
    name: "corona",
    aliases: ["코로나", "코로나바이러스", "코로나현황", "코로나 현황", "신종코로나바이러스", "코로나19", "covid-19", "covid19"],
    category: 'crawling',
    run: async (client, message, args, ops) => {
        var url = 'http://ncov.mohw.go.kr/index_main.jsp'
        var url2 = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true'
        var url3 = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true'
        var url4 = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true'

        var coronavirus_national = new Array(),
            corona19_title = new Array()

        const embed = new Discord.RichEmbed()
            .setTitle('코로나 19 현황')
            .setColor(0xffff00)
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL)

        request(url, function(error, ghkrwls, html) {
            if (!error) {
                var $ = cheerio.load(html);

                for (var i = 0; i < 3; i++) {
                    $('.co_cur > ul > li > a').each(function() {
                        var ghkr = $(this);
                        var text = ghkr.text()
                        coronavirus_national[i] = text
                        i++
                    })
                }

                for (var i = 0; i < 3; i++) {
                    $('.co_cur > ul > li > span').each(function() {
                        var ghkr = $(this);
                        var text = ghkr.text()
                        corona19_title[i] = text
                        i++
                    })
                }

                var a = coronavirus_national[0].replace(/ /gi, '')
                var b = coronavirus_national[1].replace(/ /gi, '')
                var c = coronavirus_national[2].replace(/ /gi, '')

                request(url2, function(error, dd, html) {
                    if (!error) {
                        var d = JSON.parse(html, null, 1).features[0].attributes.value
                        request(url3, function(error, dd, html) {
                            if (!error) {
                                var e = JSON.parse(html, null, 1).features[0].attributes.value
                                request(url4, function(error, dd, html) {
                                    if (!error) {
                                        var f = JSON.parse(html, null, 1).features[0].attributes.value

                                        embed.setDescription(`**국내**\n확진 환자: **${a}**\n격리 해제: **${b}**\n사망자: **${c}**\n\n**전세계**\n감염자: **${d}명**\n사망자: **${e}명**\n완치: **${f}명**\n\n**참고**\n[질병관리본부](http://ncov.mohw.go.kr/index_main.jsp)\n[존스홉킨스대학](https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)`)

                                        message.channel.send(embed)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}