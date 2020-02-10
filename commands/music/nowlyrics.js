const Lyrics = require('slyrics')
const lyrics = new Lyrics()
const Discord = require('discord.js')

module.exports = {
    name: '지금 가사',
    aliases: ['지금가사', 'nowlyric', 'nowlyrics'],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!');

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!');

        const result = await lyrics.get('melon', fetched.queue[0].songTitle)

        if (result.result === null) return message.channel.send(`\`${fetched.queue[0].songTitle}\`의 가사를 찾을 수 없습니다!`)
        
        const embed =  new Discord.RichEmbed()
            .setTitle(`${fetched.queue[0].songTitle}의 가사`)
            .setDescription(result.result)
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()   
        
        message.channel.send(embed)
    }
}