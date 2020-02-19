const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["핑"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 **Pinging...**`);
        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`🏓 **Pong!**`)
            .setDescription(`Latency: **${Math.floor(msg.createdAt - message.createdAt)}ms (${Math.floor(msg.createdAt - message.createdAt) / 1000}s)**\nAPI Latency: **${Math.round(client.ping)}ms** **(${Math.round(client.ping) / 1000}s)**`)
        msg.edit(embed);
    }
}