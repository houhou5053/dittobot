const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "차단",
    aliases: ["ban"],
    usage: "[id, | mention]",
    run: async (client, message, args) => {
        const logChannel = message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) {
            return message.reply('차단할 멤버를 멘션 또는 ID로 적어주세요.')
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply('뒤에 이유를 적어 주세요!')
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ 차단 권한이 필요합니다!")
                .then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ 디토봇에게 차단 권한이 필요합니다!")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toKick) {
            return message.reply('멤버를 찾을 수 없습니다!')
                .then(m => m.delete(5000));
        }

        if (message.author.id === toKick.id) {
            return message.reply('자기 자신을 차단할 수 없습니다!')
                .then(m => m.delete(5000));
        }

        if (client.user.id === toKick.id) {
            return message.reply('디토봇으로 디토봇을 차단하려고요...?')
        }

        if (!toKick.bannable) {
            return message.reply('저보다 역할이 높아서 차단을 못 하겠네요...')
                .then(m => m.delete(5000));
        }

        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvartarURL)
            .setFooter(message.member.displayName, message.author.displayAvartarURL)
            .setTimestamp()
            .setDescription(stripIndents`**차단된 멤버**\n${toKick} (${toKick.id})\n**차단한 사람**\n${message.author} (${message.author.id})\n**이유**\n${args.slice(1).join(" ")}`);

        const promtEmbed = new Discord.RichEmbed()
            .setColor(0x00ff00)
            .setAuthor('')
            .setDescription(`**${toKick}**님을 차단하실 건가요?`);

        message.channel.send(promtEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❎"]);

            if (emoji === "✅") {
                msg.delete();

                toKick.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (error) return message.reply('오류 발생...');
                    });

                logChannel.send(embed);
            } else if (emoji === "❎") {
                msg.delete();

                message.reply('차단이 취소 되었습니다!')
                    .then(m => m.delete(5000));
            }
        });
    }
}