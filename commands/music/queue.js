const Discord = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["que", "재생목록", "재생 목록", "목록"],
    run: async (client, message, args, ops) => {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0xffff00)
            .setTimestamp()

        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!')

        let queue = fetched.queue;
        let nowPlaying = queue[0];

        let resp = `**${nowPlaying.songTitle}** 재생 중...\n추가: **${nowPlaying.requester}**\n\n**목록**\n`;

        for (var i = 1; i < queue.length; i++) {
            resp += `${i}. **${queue[i].songTitle}** - ${queue[i].requester}\n`;
        }
        
        embed.setDescription(`${resp}`)

        message.channel.send(embed);
    }
}