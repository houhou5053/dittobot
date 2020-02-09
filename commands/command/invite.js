const Discord = require("discord.js");

module.exports = {
    name: "초대",
    aliases: ['초대링크', '초대 링크', 'invite'],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setURL('https://discordapp.com/api/oauth2/authorize?client_id=657954787236642816&permissions=8&scope=bot')
            .setTitle('초대하기')
            .setDescription('**디토봇을 이용해 주셔서 감사합니다!**')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
        message.channel.send(embed);
    }
}