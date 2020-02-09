module.exports = {
    name: "나가",
    aliases: ["leave", "lea", "l", "skrk"],
    run: async (client, message, args, ops) => {
        if (!message.member.voiceChannel) return message.channel.send('음성 채널에 들어가 주세요!')

        if (!message.guild.me.voiceChannel) return message.channel.send('저 이미 나와 있어요!')

        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('저랑 같은 음성 채널에 있으셔야 해요!')

        message.guild.me.voiceChannel.leave()

        message.channel.send('나갔어요!');
    }
}