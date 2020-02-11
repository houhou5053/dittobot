const Discord = require("discord.js");

module.exports = {
    name: "핑",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 **Pinging...**`);
        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`🏓 **퐁!**`)
            .setDescription(`지연 시간: **${Math.floor(msg.createdAt - message.createdAt)}ms (${Math.floor(msg.createdAt - message.createdAt) / 1000}초)**\nAPI 지연 시간: **${Math.round(client.ping)}ms** **(${Math.round(client.ping) / 1000}초)**`)
        msg.edit(embed);
    }
}