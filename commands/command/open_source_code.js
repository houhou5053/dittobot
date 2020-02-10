const Discord = require("discord.js")

module.exports = {
    name: "오픈 소스",
    aliases: ["오픈소스", "소스코드", "소스 코드", "오픈소스코드", "opensource", "open source", "source code", "sourcecode", "opensourcecode"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setTitle('디토봇 오픈 소스 코드')
            .setURL('https://github.com/ditto7890/dittobot')
            .setColor(0x00ffff)

        message.channel.send(embed)
    }
}