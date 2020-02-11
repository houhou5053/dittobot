const Discord = require('discord.js')

module.exports = {
    name: "k",
    aliases: ["j", "l"],
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.channel.send('관리자만 가능합니다.')

        let filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '⭕') && user.id === message.author.id

        let reason = args.slice(0).join(" ")

        let firstembed = new Discord.RichEmbed()
            .setTitle(`${client.guilds.size}개의 서버에 공지가 발신됩니다`)
            .addField(`공지의 내용은 다음과 같습니다`, `\`\`\`\n${reason}\n\`\`\``)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter('테스트')

        message.channel.send(firstembed).then((th) => {
            th.react('⭕')
            th.react('❌')
            th.awaitReactions(filter, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '⭕') {
                    let errors = ``
                    client.guilds.forEach(g => {
                        let reason = args.slice(0).join(" ")
                        let gc
                        g.channels.forEach(c => {
                            let cname = `${c.name}`
                            if (cname.includes('봇-공지') || cname.includes('봇_공지') || cname.includes('디토봇') || cname.includes('🌐ㅣ봇_실험')) {
                                if (!cname.includes('길드') && !cname.includes('벤') && !cname.includes('경고') && !cname.includes('guild') && !cname.includes('ban') && !cname.includes('warn')) {
                                    gc = `${c.id}`
                                }
                            }
                        })

                let ann = new Discord.RichEmbed()
                    .setTitle(`${client.user.username} 공지`)
                    .setThumbnail(client.user.displayAvatarURL)
                    .setDescription(`${reason}`)
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setFooter(`${message.member.user.tag} - 인증됨`, message.author.avatarURL)
                    .setTimestamp()

                let Ch = client.channels.get(gc)

                let ment

                try {
                    if (!Ch.permissionsFor(g.me).has(`SEND_MESSAGES`)) {
                        ment = `${g.name}: 발신 실패 (메시지 발신 권한 없음)\n`
                    } else { Ch.send(ann) }
                } catch (e) {
                    if (!g.me.hasPermission("MANAGE_CHANNELS")) {
                    ment = `${g.name}: 발신 실패 (채널 생성 권한 없음)\n`
                    } else {
                        ment = `${g.name}: 채널 자동 생성 및 발신 성공\n`
                        g.createChannel('디토봇-공지', 'text').then(channel => { channel.send(ann) })
                    }
                } finally {
                    if (ment) { errors += ment }
                }
            })
            if (errors === ``) { errors = '성공적으로 모든 서버에 발신되었습니다!' }
                let finalembed = new Discord.RichEmbed()
                    .setTitle('발신이 완료되었습니다!')
                    .addField('결과:', `\`\`\`\n${errors}\`\`\``)
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                th.edit(finalembed)
                } else {
                let cemb = new Discord.RichEmbed()
                    .setTitle('공지 발신이 취소되었습니다')
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                th.edit(cemb)
                }
            })
        })
    }
}