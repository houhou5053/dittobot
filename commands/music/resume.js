module.exports = {
    name: "resume",
    aliases: ["res", "r", "ㄱㄷ녀ㅡㄷ", "다시 재생", "ektl wotod", "다시재생"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!');

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!');

        if (!fetched.dispatcher.paused) return message.channel.send('이 음악은 일시 정지가 되지 않았어요!');

        fetched.dispatcher.resume();

        message.channel.send(`**${fetched.queue[0].songTitle}**이(가) 다시 재생됩니다!`)
    }
}