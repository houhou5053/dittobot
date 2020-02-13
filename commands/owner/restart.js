const Discord = require('discord.js');

module.exports = {
    name: "restart",
    aliases: ["재시작"],
    category: 'onwer',
    run: async (client, message, args, ops) => {
        if(message.author.id !== ops.ownerID) return message.reply('디토봇 제작자만 가능합니다!');

        try {
            message.react('👌')
            await message.channel.send('Restarting...')
            await message.channel.send('Complete...!')
            process.exit(1);
        } catch(e) {
            message.channel.send(`에러... ${e.message}`)
        }
    }
}