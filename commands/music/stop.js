module.exports = {
    name: "stop",
    aliases: ["스탑", "ㄴ새ㅔ", "tmxkq", "멈춰", "ajacnj"],
    run: async (client, message, args, ops) => {
        let fetched = ops.active.get(message.guild.id)

        if (!fetched) return message.channel.send('현재 재생 중인 음악이 없어요!')

        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!');

        ops.active.set(message.guild.id, fetched);
        
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (vc) vc.leave()
        
        fetched.dispatcher.end()

        message.channel.send(`\`${message.guild.name}\` 서버의 재생 목록을 없애고 나갑니다!`)
    }
}