const Lyrics = require("slyrics")
const lyrics = new Lyrics()
const Discord = require('discord.js')

module.exports = {
    name: 'lyrics',
    aliases: ['가사검색', 'lyric', '가사'],
    run: async (client, message, args, tools) => {

        if (!args.join(' ')) return message.channel.send('가사를 검색할 노래 이름을 입력해 주세요!')
        else if (args.join(' ')) {
            const result = await lyrics.get('melon', args.join(' '))

            if (result.error) return message.channel.send(`\`${result.result.toString()}\`의 가사를 찾을 수 없습니다!`)
            else {
                let lyricsEmbed = new Discord.RichEmbed()
                .setTitle(`${result.artist} - ${result.title}`)
                .setThumbnail(result.albumArt)
                .setColor(0xffff00)
                if (result.result.toString().length < 1980) {
                    lyricsEmbed.setDescription(`[바로가기](${result.url})\n\n${result.result.toString()}`)
                    message.channel.send(lyricsEmbed)
                } else {
                    lyricsEmbed.setDescription(`[바로가기](${result.url})\n\n${result.result.toString().substr(0, 1955)}`)
                    message.channel.send(lyricsEmbed)
                    message.channel.send(new RichEmbed().setColor(0xffff00).setDescription(`${result.result.toString().replace(result.result.toString().substr(0, 1955), '')}`))
                }
            }
        }

        /*if (!args[0]) return message.reply('가사를 검색할 노래 이름을 입력해 주세요!').then(m => m.delete(5000));
        
        const args2 = args.slice(0).join(" ")

        const result = await lyrics.get('melon', args2.toString())

        if (result.result === null) return message.channel.send(`\`${args2}\`의 가사를 찾을 수 없습니다!`)
        
        const embed =  new Discord.RichEmbed()
            .setTitle(`${args2.toString()}의 가사`)
            .setDescription(result.result.toString())
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        
        message.channel.send(embed)*/
    }
}