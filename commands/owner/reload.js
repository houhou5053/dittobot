module.exports = {
    name: "리로드",
    aliases: ["reload"],
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.channel.send('디토봇 제작자만 가능합니다!')

        if (!args[0] || !args[1]) return message.channel.send('리로드할 파일을 입력하세요!')

        delete require.cache[require.resolve(`../${args[0]}/${args[1]}.js`)]
        client.commands.delete(args[1])
        const pull = require(`../${args[0]}/${args[1]}.js`)
        client.commands.set(args[1], pull)

        message.channel.send(`**${args[0].toLowerCase()}/${args[1].toLowerCase()}.js** 리로드 완료!`)
    }
}