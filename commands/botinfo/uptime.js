const Discord = require("discord.js")

module.exports = {
    name: "uptime",
    aliases: ["업타임"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle(`${client.user.username} 업타임`)
            .setColor(0x00ffff)
            .setDescription(`**${getUptime()}**`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL)
        message.channel.send(embed)

        function getUptime() {
            const sec = Math.floor((client.uptime / 1000) % 60).toString()
            const min = Math.floor((client.uptime / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString()
        
            if (days === '0' && hrs === '0' && min === '0') return `${sec.padStart(1, '0')}초`
            else if (days === '0' && hrs === '0') return `${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
            else if (days === '0') return `${hrs.padStart(1, '0')}시간 ${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
            else return `${days.padStart(1, '0')}일 ${hrs.padStart(1, '0')}시간 ${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
        }
    }
}