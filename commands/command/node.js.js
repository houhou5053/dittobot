const Discord = require("discord.js")

module.exports = {
    name: "node.js",
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle('Node.js')
            .setURL('https://nodejs.org/ko/')
            .setColor(0xffff00)
            .setDescription('**node.js**...')
            .setThumbnail('https://cdn.discordapp.com/emojis/403294965192458240.png?v=1')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)

        message.channel.send(embed)
    }
}
