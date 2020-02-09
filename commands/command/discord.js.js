const Discord = require("discord.js")

module.exports = {
    name: "discord.js",
    aliases: ["discordjs"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle('Discord.js')
            .setURL('https://discord.js.org/')
            .setThumbnail('https://discord.js.org/static/logo-square.png')
            .setDescription('디토봇은 **discord.js**로 만들어졌어요!\n**discord.js 조아**')
            .setColor(0x00ffff)
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(embed)
    }
}