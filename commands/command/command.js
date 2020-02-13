const Discord = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = {
    name: "command",
    aliases: ["커맨드", "커멘드", "cmd", "명령어"],
    usage: "[command | alias]",
    category: "command",
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0])
        } else {
            return getAll(client, message)
        }
    }
}

function getAll(client, message) {
    const embed = new Discord.RichEmbed()
        .setColor(0x00ffff)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n")
    }

    let info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
        .reduce((string, category) => `${string}\n${category}`)

    return message.channel.send(embed.setDescription(info))
}

function getCMD(client, message, input) {
    const embed = new Discord.RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()))

    let info = `**${input.toLowerCase()}**에 대한 명령어를 찾을 수 없습니다.`

    if (!cmd) return message.channel.send(embed.setColor(0xff0000).setDescription(info))

    if (cmd.name) info = `**명령어 이름**: ${cmd.name}`
    if (cmd.aliases) info += `\n**aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`
    if (cmd.description) info += `\n**설명**: ${cmd.description}`
    if (cmd.usage) {
        info += `\n**사용**: ${cmd.usage}`
        embed.setFooter(`문법: <> = 필수, [] = 선택`)
    }

    embed.setDescription(info).setColor(0x00ffff)

    return message.channel.send(embed)
}