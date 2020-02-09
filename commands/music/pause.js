module.exports = {
    name: "pause",
    aliases: ["pau", "p", "중지", "ㅔ면ㄷ", "wndwl", "일시 중지", "일시중지", "일시 정지", "일시정지", "dlftlwjdwl", "dlftl wjdwl"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!');

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!');

        if (fetched.dispatcher.paused) return message.channel.send('이 음악은 이미 일시 정지 되었어요!');

        fetched.dispatcher.pause();

        message.channel.send(`**${fetched.queue[0].songTitle}**이(가) 일시 정지 되었습니다!`)
    }
}