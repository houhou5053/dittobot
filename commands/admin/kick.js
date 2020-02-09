const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "추방",
    aliases: ["kick"],
    usage: "[id, | mention]",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(ch => ch.id === '661546747100790784') || message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) {
            return message.reply('추방할 멤버를 멘션 또는 ID로 적어주세요.')
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply('뒤에 이유를 적어 주세요!')
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ 추방 권한이 필요합니다!")
                .then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ 디토봇에게 추방 권한이 필요합니다!")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toKick) {
            return message.reply('멤버를 찾을 수 없습니다!')
                .then(m => m.delete(5000));
        }

        if (message.author.id === toKick.id) {
            return message.reply('자기 자신을 추방할 수 없습니다!')
                .then(m => m.delete(5000));
        }

        if (!toKick.kickable) {
            return message.reply('저보다 역할이 높아서 추방을 못 하겠네요...')
                .then(m => m.delete(5000));
        }

        const embed = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvartarURL)
            .setFooter(message.member.displayName, message.author.displayAvartarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> 추방된 멤버: **${toKick} (${toKick.id})
            **> 추방한 사람: **${message.author} (${message.author.id})
            **> 이유: **${args.slice(1).join(" ")}`);

        const promtEmbed = new Discord.RichEmbed()
            .setColor(0x00ff00)
            .setAuthor('')
            .setDescription(`**${toKick}**님을 추방하실 건가요?`);

        message.channel.send(promtEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❎"]);

            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (error) return message.reply('오류 발생...\nditto7890#8948 님한테 연락 주세요...');
                    });

                logChannel.send(embed);
            } else if (emoji === "❎") {
                msg.delete();

                message.reply('추방이 취소 되었습니다!')
                    .then(m => m.delete(5000));
            }
        });
    }
}