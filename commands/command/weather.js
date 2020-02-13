const weather = require("weather-js")
const Discord = require("discord.js")

module.exports = {
    name: "weather",
    aliases: ["날씨"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('지역이나 우편 번호를 입력해 주세요!')

        weather.find({search: args[0], degreeType: 'C'}, function(err, result) {
            if (err) return console.log(err);

            var current = result[0].current
            var location = result[0].location
            var wind = current.windspeed.replace(/km\/h/g, '')

            const embed = new Discord.RichEmbed()
                .setTitle(`${location.name}의 날씨`)
                .setColor(0x00ffff)
                .setThumbnail(current.imageUrl)
                .addField('🌫 바람', `${(wind * 0.277777778).toFixed(1)}m/s`)
                .addField('온도', `${current.temperature}℃`)
                .addField('체감 온도', `${current.feelslike}℃`)
                .addField('습도', `${current.humidity}%`)
                .setFooter(`${current.date} ${current.observationtime} 기준`)
                .setTimestamp()

            message.channel.send(embed)
        });
    }
}