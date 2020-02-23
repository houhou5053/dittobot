const Discord = require("discord.js");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "botinfo",
    aliases: ["봇정보"],
    run: async (client, message, args) => {
        const created = moment(client.user.createdAt).format('YYYY년 MM월 DD일');

        const m = await message.channel.send(`🏓 **Pinging...**`);

        const embed = new Discord.RichEmbed()
            .setTitle(`${client.user.username} 정보`)
            .setColor(0x00ff00)
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`> 봇 이름: **${client.user.username}**
            > 🆔 봇 ID: **${client.user.id}**
            > 🎂 봇 생일: **${created}**
            > 개발자: **ditto7890#8948**
            > 사이트: **https://dittobot.ga/**

            > 서버 수: **${client.guilds.size}개**
            > 🙍‍♂️ 유저: **${client.users.size}명**
            > 업타임: **${getUptime()}**

            > **🏓 핑 정보**
            > 지연 시간: **${Math.floor(m.createdAt - message.createdAt)}ms (${Math.floor(m.createdAt - message.createdAt) / 1000}초)**
            > API 지연 시간: **${Math.round(client.ping)}ms (${Math.round(client.ping) / 1000}초)**

            > 개발 언어: **Javascript** ${client.emojis.find(x => x.name == "javascript")}
            > ${client.emojis.find(x => x.name == "nodejs")} Node.js 버전: **v13.5.0**
            > ${client.emojis.find(x => x.name == "discord_logo")} Discord.js 버전: **v11.5.1**`)

        m.edit(embed)

        function getUptime() {
            const sec = Math.floor((client.uptime / 1000) % 60).toString()
            const min = Math.floor((client.uptime / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString()
        
            if (days === '0' && hrs === '0' && min === '0') return `${sec.padStart(1, '0')}초`
            else if (days === '0' && hrs === '0') return `${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
            else if (days === '0') return `${hrs.padStart(1, '0')}시간 ${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
            else return `${days.padStart(1, '0')}일 ${hrs.padStart(1, '0')}시간 ${min.padStart(1, '0')}분 ${sec.padStart(1, '0')}초`
        }
    }
}