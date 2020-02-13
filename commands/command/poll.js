const Discord = require("discord.js");

module.exports = {
    name: "poll",
    aliases: ["vote", "투표"],
    run: async (client, message, args) => {
        if (!args[0]) {
        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setTitle("투표")
            .setDescription("**디토야 투표 <내용>**으로 써 보세요!");
        message.channel.send(embed);
        } else {
            const msgArgs = args.slice(0).join(" ");
            const embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}님의 투표입니다.`)
                .setDescription(`📃 ${msgArgs}`)
                .setColor(0xffff00)
            message.channel.send(embed).then(async function (message) {
                await message.react('👍');
                await message.react('👎');
            });
        }
    }
}