const Discord = require("discord.js");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "서버 정보",
    aliases: ["서버정보", "정보서버", "정보 서버", "서정", "serverinfo", "server-info"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle(`${message.guild.name} 서버의 정보`)
            .setColor(0xffff00)
            .setThumbnail(message.guild.iconURL)
            .setFooter(message.guild.name, message.guild.iconURL)
            .addField('👑 서버 주인', `**${message.guild.owner.user.username}\n(ID: ${message.guild.ownerID})**`)

        if (message.guild.region === "south-korea") {
            embed.addField('🌎 서버 지역', `**:flag_kr: 대한민국 (South Korea)**`)
        } else if (message.guild.region === "japan") {
            embed.addField('🌎 서버 지역', `**:flag_jp: 일본 (Japan)**`)
        } else if (message.guild.region === "brazil") {
            embed.addField('🌎 서버 지역', `**:flag_br: 브라질 (Brazil)**`)
        } else if (message.guild.region === "india") {
            embed.addField('🌎 서버 지역', `**:flag_in: 인도 (India)**`)
        } else if (message.guild.region === "europe") {
            embed.addField('🌎 서버 지역', `**:flag_eu: 유럽 (Europe)**`)
        } else if (message.guild.region === "hongkong") {
            embed.addField('🌎 서버 지역', `**:flag_hk: 홍콩 (Hong Kong)**`)
        } else if (message.guild.region === "russia") {
            embed.addField('🌎 서버 지역', `**:flag_ru: 러시아 (Russia)**`)
        } else if (message.guild.region === "southafrica") {
            embed.addField('🌎 서버 지역', `**:flag_za: 남아프리카 공화국 (South Africa)**`)
        } else if (message.guild.region === "singapore") {
            embed.addField('🌎 서버 지역', `**:flag_sg: 싱가포르 (Singapore)**`)
        } else if (message.guild.region === "sydney") {
            embed.addField('🌎 서버 지역', `**:flag_au: 시드니 (Sydney)**`)
        } else if (message.guild.region === "us-central") {
            embed.addField('🌎 서버 지역', `**:flag_us: 미국 중부 (US Central)**`)
        } else if (message.guild.region === "us-east") {
            embed.addField('🌎 서버 지역', `**:flag_us: 미국 동부 (US East)**`)
        } else if (message.guild.region === "us-south") {
            embed.addField('🌎 서버 지역', `**:flag_us: 미국 남부 (US South)**`)
        } else if (message.guild.region === "us-west") {
            embed.addField('🌎 서버 지역', `**:flag_us: 미국 서부 (US West)**`)
        }

        embed.addField('🆔 서버 ID', `**${message.guild.id}**`)
        embed.addField('🙎‍♂️ 서버 유저', `**ALL: ${message.guild.memberCount} (USER: ${message.guild.memberCount - message.guild.members.filter(member => member.user.bot).size} | BOT: ${message.guild.members.filter(member => member.user.bot).size})**`)

        const created = moment(message.guild.createdAt).format('YYYY년 MM월 DD일 dddd HH시 mm분');

        embed.addField('🎂 서버 생일', `**${created}**`)
        embed.addField('💬 채팅 채널', `**ALL: ${message.guild.channels.size} (CHANNEL: ${message.guild.channels.filter(channel => channel.parent).size} | CATEGORY: ${message.guild.channels.size - message.guild.channels.filter(channel => channel.parent).size})**`)
        if (message.guild.afkChannel === null) {
            embed.addField('💤 잠수 채널', `**없음**`)
        } else {
            embed.addField('💤 잠수 채널', `**${message.guild.afkChannel.name}**`)
            if (message.guild.afkTimeout === 60) {
                embed.addField('⏰ 잠수 시간 제한', `**1분**`)
            } else if (message.guild.afkTimeout === 300) {
                embed.addField('⏰ 잠수 시간 제한', `**5분**`)
            } else if (message.guild.afkTimeout === 900) {
                embed.addField('⏰ 잠수 시간 제한', `**15분**`)
            } else if (message.guild.afkTimeout === 1800) {
                embed.addField('⏰ 잠수 시간 제한', `**30분**`)
            } else if (message.guild.afkTimeout === 3600) {
                embed.addField('⏰ 잠수 시간 제한', `**1시간**`)
            }
        }

        if (message.guild.verificationLevel === 0) {
            embed.addField('🔐 서버 보안', `**제한 없음**`)
        } else if (message.guild.verificationLevel === 1) {
            embed.addField('🔐 서버 보안', `**이메일이 인증이 완료된 Disocrd 계정**`)
        } else if (message.guild.verificationLevel === 2) {
            embed.addField('🔐 서버 보안', `**Discord에 가입한 지 5분**`)
        } else if (message.guild.verificationLevel === 3) {
            embed.addField('🔐 서버 보안', `**이 서버에 멤버가 된 지 10분**`)
        } else if (message.guild.verificationLevel === 4) {
            embed.addField('🔐 서버 보안', `**휴대폰 인증이 완료된 Discord 계정**`)
        }

        if (message.guild.mfaLevel === 0) {
            embed.addField('📱 2단계 인증', `**없음**`)
        } else if (message.guild.mfaLevel === 1) {
            embed.addField('📱 2단계 인증', `**활성화**`)
        }

        if (message.guild.systemChannel === null) {
            embed.addField('📡 시스템 메세지 채널', `**없음**`)
        } else {
            embed.addField('📡 시스템 메세지 채널', `**${message.guild.systemChannel.name}**`)
        }

        if (message.guild.explicitContentFilter === 2) {
            embed.addField('📺 유해 미디어 콘텐츠 필터', `**모든 멤버의 미디어 콘텐츠를 스캔**`)
        } else if (message.guild.explicitContentFilter === 1) {
            embed.addField('📺 유해 미디어 콘텐츠 필터', `**역할 없는 멤버의 미디어 콘텐츠를 스캔**`)
        } else if (message.guild.explicitContentFilter === 0) {
            embed.addField('📺 유해 미디어 콘텐츠 필터', `**미디어 콘텐츠를 스캔하지 않음**`)
        }

        if (message.guild.defaultMessageNotifications === "ALL") {
            embed.addField('🔔 알림 설정 초기화', `**모든 메세지**`)
        } else if (message.guild.defaultMessageNotifications === "MENTIONS") {
            embed.addField('🔔 알림 설정 초기화', `**@mentions만**`)
        }

        const role = message.guild.roles.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "없음";

        const embed2 = new Discord.RichEmbed()
            .setColor(0xffff00)
            .setTitle(`${message.guild.name} 서버의 역할 (${message.guild.roles.size - 1}개)`)
            .setDescription(`**${role}**`);

        const embed3 = new Discord.RichEmbed()
            .setColor(0xffff00)
            embed3.setTitle(`${message.guild.name} 서버의 이모지 (${message.guild.emojis.size}개)`)

        if (message.guild.emojis.size === 0) {
            embed3.setDescription(`**없음**`)
        } else {
            embed3.setDescription(`**${message.guild.emojis.map(e => e.toString()).join(" ")}**`)
        }

        message.channel.send(embed);
        
        if (message.member.hasPermission("MANAGE_ROLES") && message.guild.me.hasPermission("MANAGE_ROLES")) {
            message.channel.send(embed2)
        }

        if (message.member.hasPermission("MANAGE_EMOJIS") && message.guild.me.hasPermission("MANAGE_EMOJIS")) {
            message.channel.send(embed3);
        }
    }
}