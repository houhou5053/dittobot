const Lyrics = require('slyrics')
const lyrics = new Lyrics()
const Discord = require('discord.js')

module.exports = {
    name: '가사',
    aliases: ['가사검색', 'lyric', 'lyrics'],
    run: async (client, message, args, tools) => {

        if (!args[0]) return message.reply('가사를 검색할 노래 이름을 입력해 주세요!').then(m => m.delete(5000));
        
        const args2 = args.slice(0).join(" ")

        const result = await lyrics.get('melon', args2.toString())

        if (result.result === null) return message.channel.send(`\`${args2}\`의 가사를 찾을 수 없습니다!`)
        
        const embed =  new Discord.RichEmbed()
            .setTitle(`${args2.toString()}의 가사`)
            .setDescription(result.result.toString())
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        
        message.channel.send(embed)
    }
}