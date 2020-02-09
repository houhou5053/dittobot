module.exports = {
    name: "volume",
    aliases: ["vol", "v", "패ㅣㅕㅡㄷ", "볼륨", "qhffba", "소리"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!');

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!');

        if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('0 ~ 200 사이의 수를 써주세요!')

        fetched.dispatcher.setVolume(args[0]/100);

        message.channel.send(`**${fetched.queue[0].songTitle}** 음악의 볼륨을 **${args[0]}**(으)로 설정 완료!`);
    }
}