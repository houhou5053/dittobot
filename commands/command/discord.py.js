const Discord = require("discord.js")

module.exports = {
    name: "discord.py",
    aliases: ["discordpy"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle('Discord.py')
            .setURL('https://github.com/Rapptz/discord.py')
            .setDescription('디토봇은 **discord.py**로 만들어지지 않아서 잘 모르겠네요...!\n**discord.js 조아**(?)')
            .setColor(0x00ffff)
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(embed)
    }
}