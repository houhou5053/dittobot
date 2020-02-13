const search = require("yt-search")
const Discord = require("discord.js")

module.exports = {
    name: "ytsearch",
    aliases: ["youtubesearch", "유튜브검색"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('검색할 내용을 입력해 주세요!')
        
        const m = await message.channel.send('검색 중...')

        search(args.join(" "), function (err, res) {
            if (err) return message.channel.send(`에러... ${err}`);

            var a = 0
            var b = 1

            let videos = res.videos.slice(a, b);

            const embed = new Discord.RichEmbed()
                .setTitle(`"${args.join(" ")}" 검색 결과`)
                .setColor(0xff0000)

            let resp = '';

            for (var i in videos) {
                resp += `${parseInt(i)+1}. **${videos[i].title}**\n${videos[i].url}\n\n`;
            }

            embed.addField('검색 결과', `${resp}`)

            m.edit(embed);
        })
    }
}