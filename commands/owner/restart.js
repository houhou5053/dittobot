const Discord = require('discord.js');

module.exports = {
    name: "재시작",
    aliases: ["restart"],
    run: async (client, message, args, ops) => {
        if(message.author.id !== ops.ownerID) return message.reply('권한이 없습니다.');

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