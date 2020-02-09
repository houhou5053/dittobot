const Discord = require("discord.js");

module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 **Pinging...**`);
        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`🏓 PONG!`)
            .setDescription(`Latency is **${Math.floor(msg.createdAt - message.createdAt)}ms**\nAPI Latency is **${Math.round(client.ping)}ms**`)
        msg.edit(embed);
    }
}