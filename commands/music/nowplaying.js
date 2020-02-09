const Discord = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["지금곡", "지금음악"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!')

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!')

        let queue = fetched.queue;
        let nowPlaying = queue[0];

        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setTitle(`${nowPlaying.songTitle}`)
            .setURL(`${nowPlaying.url}`)
            .setTimestamp()
            .setDescription(`**${nowPlaying.songTitle}** 재생 중...\n**${nowPlaying.requester}**`)
            .setThumbnail(`https://img.youtube.com/vi/${nowPlaying.thumbnail}/default.jpg`)
            .setFooter(message.author.username, message.author.displayAvatarURL)

        message.channel.send(embed)
    }
}