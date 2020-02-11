const { promptMessage } = require("../../functions.js");
const Discord = require("discord.js");

const choose = ["✅", "❎"];

module.exports = {
    name: "공지",
    aliases: ["notice", "공지사항"],
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.reply('디토봇 제작자만 가능합니다!')

        if (!args[0]) return message.channel.send('내용을 써 주세요!')

        const Description = args.slice(0).join(" ")

        const firstembed = new Discord.RichEmbed()
            .setTitle(`📢 디토봇 공지사항`)
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setDescription(`${Description}\n선택해 주세요!`)
            .setTimestamp();

        const m = await message.reply(firstembed);
        let c;
        const reacted = await promptMessage(m, message.author, 15, choose);

        await choice(reacted)

        if (c === 0) {
            return message.channel.send('공지가 취소되었습니다!')
        }
        await m.clearReactions();

        m.edit(firstembed);

        const noticeembed = new Discord.RichEmbed()
            .setTimestamp()
            .setTitle(`📢 디토봇 공지사항`)
            .setDescription(`${Description}`)
            .setColor(0xffff00)
            .setFooter(`${message.author.username} • 제작자`, message.author.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)

        client.guilds.forEach(guild => {
            let gc
            guild.channels.forEach(channel => {
                if (channel.name.includes("봇-공지") || channel.name.includes("봇_공지") || channel.name.includes("디토봇") || channel.name.includes("🌐ㅣ봇_실험")) {
                    if (channel.type === "text") {
                        gc = channel.id
                    }
                }
            });
            if (!gc) return;

            let Ch = client.channels.get(gc)
            Ch.send(noticeembed)
        })

        function choice(me) {
            if (me === "✅") {
                message.channel.send(`공지를 보냅니다!`)
                c = 1;
                return;
            } else if (me === "❎") {
                c = 0;
                return;
            }
        }
    }
}