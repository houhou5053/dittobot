const Discord = require("discord.js")

module.exports = {
    name: "uptime",
    aliases: ["업타임"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle(`${client.user.username} 업타임`)
            .setColor(0x00ffff)
            .setDescription(`**${duration(client.uptime)}**`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL)
        message.channel.send(embed)
    }
}

function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')}일 ${hrs.padStart(2, '0')}시간 ${min.padStart(2, '0')}분 ${sec.padStart(2, '0')}초`
}