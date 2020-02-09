const Discord = require("discord.js");

module.exports = {
    name: "서버목록",
    aliases: ["서버 목록"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle('디토봇 서버')
            .setColor(0xffff00)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(client.guilds.map(el => el.name));
        message.channel.send(`${client.guilds.size}개의 서버 | ${client.users.size}명의 유저 | ${client.channels.size}개의 채팅 채널과 함께하고 있어요!\n`)
        message.channel.send(embed);
    }
}