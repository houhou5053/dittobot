const { getMember } = require("../../functions.js");
const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require('moment-timezone');
moment.locale('ko-KR');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");

module.exports = {
    name: "내정보",
    aliases: ["정보", "userinfo", "user-info", "user-information", "user", "info-user", "user_info"],
    usage: "[id, | mention]",
    run: async (client, message, args) => {

        const member = getMember(message, args.join(" "));

        const roles = member.roles.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "없음";

        const joined = moment(member.joinedAt).format('YYYY년 MM월 DD일 dddd HH시 mm분');
        const created = moment(member.user.createdAt).format('YYYY년 MM월 DD일 dddd HH시 mm분');


        const embed = new Discord.RichEmbed()
            .setTitle(`${member.user.username}님의 정보`)
            .setFooter(member.user.username, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

            .addField(`${client.emojis.find(x => x.name == "discord_logo")} 유저 이름`, `**${member.user.username}**`)
            .addField(`${client.emojis.find(x => x.name == "discord_logo")} 디스플레이 이름`, stripIndents`**${member.displayName}**`)
            .addField(`${client.emojis.find(x => x.name == "discord_logo")} 디스코드 태그`, `**${member.user.tag}**`)

            if (member.user.presence.status !== "offline" && member.user.bot === false) {
                if (member.user.presence.clientStatus.desktop) {
                    embed.addField(`${client.emojis.find(x => x.name == "discord_logo")} 클라이언트`, `**🖥 데스크탑**`)
                } else if (member.user.presence.clientStatus.web) {
                    embed.addField(`${client.emojis.find(x => x.name == "discord_logo")} 클라이언트`, `**⌨ 웹**`)
                } else if (member.user.presence.clientStatus.mobile) {
                    embed.addField(`${client.emojis.find(x => x.name == "discord_logo")} 클라이언트`, `**📱 모바일**`)
                }
            }

            embed.addField('🆔 ID', stripIndents`**${member.user.id}**`)

            if (member.user.presence.status === "online") {
                embed.addField('상태', `**:green_circle: 온라인**`)
            } else if (member.user.presence.status === "idle") {
                embed.addField('상태', `**:crescent_moon: 자리 비움**`)
            } else if (member.user.presence.status === "dnd") {
                embed.addField('상태', `**:no_entry: 다른 용무 중**`)
            } else if (member.user.presence.status === "offline") {
                embed.addField('상태', `**:white_square_button: 오프라인**`)
            }

            embed.addField(`📥 서버에 들어온 날짜`, `**${joined}**`)
            embed.addField('📥 디스코드 가입 날짜', `**${created}**`)
            embed.setTimestamp()

            if (member.user.presence.game) {
                if (member.user.presence.game.name === "Custom Status") {
                    embed.addField('활동', `**${member.user.presence.game.state}**`);
                } else {
                    embed.addField('활동', `**${member.user.presence.game.name}**`);
                }
            } else {
                embed.addField('활동', `**없음**`)
            }

        const embed2 = new Discord.RichEmbed()
            .setTitle(`${member.user.username}님의 역할 (${member.roles.size - 1}개)`)
            .setDescription(`**${roles}**`)
            .setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

        Money.findOne({
            userID: member.user.id,
        }, (err, money) => {
            if (err) console.log(err);

            if (!money) {
                embed.addField(`${client.emojis.find(x => x.name == "dittobot")} 디토봇 가입`, '**❎ 가입이 되어 있지 않습니다.**')
            } else {
                embed.addField(`${client.emojis.find(x => x.name == "dittobot")} 디토봇 가입`, '**✅ 가입이 되어 있습니다.**')
            }

            message.channel.send(embed);
            message.channel.send(embed2);
        });
    }
}