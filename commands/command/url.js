const Discord = require("discord.js");
const gg = require("gg-shortener-js");

module.exports = {
    name: "단축",
    aliases: ["url"],
    run: async (client, message, args) => {
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error')
                .setColor(0xff0000)
                .setDescription(`**URL을 써주세요!\n디토야 단축 URL**`)
                .setFooter('디토 URL 단축기', client.user.displayAvatarURL)
                .setTimestamp();
            return message.channel.send(embed);
        }

        const args2 = args.slice(0).join(" ");

        gg.short(`${args2}`).then((response) => {
            const embed = new Discord.RichEmbed()
                .setTitle('디토 URL 단축기')
                .setColor(0xffff00)
                .setDescription(`**${response}**`)
            message.channel.send(embed);
        })
    }
}