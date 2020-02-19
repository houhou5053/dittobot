module.exports = {
    name: "firework",
    aliases: ["fireworks"],
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.channel.send('디토봇 제작자만 가능합니다!')
        
        if (!args[0]) return message.channel.send('내용을 써 주세요!')

        message.guild.channels.forEach(channel => {
            if (channel.type === 'text')
            channel.send(args.slice(0).join(" "))
        })
    }
}