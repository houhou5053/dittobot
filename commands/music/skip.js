const Discord = require("discord.js")

module.exports = {
    name: "skip",
    aliases: ["sk", "ski", "나ㅑㅔ", "스킵", "tmmzlq"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id)

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!')

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!')

        let userCount = message.member.voiceChannel.members.filter(u => u.user - u.user.bot).size

        let required = Math.ceil(userCount)

        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = []

        if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`이미 투표하셨어요! **${fetched.queue[0].voteSkips.length}/${required}**`)

        fetched.queue[0].voteSkips.push(message.member.id)

        ops.active.set(message.guild.id, fetched)

        if (fetched.queue[0].voteSkips.length >= required) {
            const embed = new Discord.RichEmbed()
                .setTitle(`${fetched.queue[0].songTitle} 스킵 완료!`)
                .setURL(`${fetched.queue[0].url}`)
                .setColor(0xffff00)
                .setFooter(message.author.username, message.author.displayAvatarURL)
                .setTimestamp()
                .setThumbnail(`https://img.youtube.com/vi/${fetched.queue[0].thumbnail}/default.jpg`)
            message.channel.send(embed);

            return fetched.dispatcher.emit('finish')
        }

        message.channel.send(`**스킵한다**에 투표가 추가 되었어요! **${fetched.queue[0].voteSkips.length}/${required}**`)
    }
}