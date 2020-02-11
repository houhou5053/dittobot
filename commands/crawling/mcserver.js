const request = require("request");
const Discord = require("discord.js");
const ping = require("minecraft-server-util")

module.exports = {
    name: "mincraftserver",
    aliases: ["마크서버", "mcserver", "마인크래프트서버"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('서버 이름을 써 주세요!')
        var url = args[0];

        const embed = new Discord.RichEmbed()
            .setAuthor('Minecraft', 'https://media.discordapp.net/attachments/676712324387700747/676712391680983071/minecraft.png')
            .setTitle(`${url} 서버 정보`)
            .setColor(0x00ff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();

        request(`https://mcsrvstat.us/server/${url.toString()}`, function(err, html, body) {
            if (!err) {
                try {
                    var status = body.split("<h2>")[1].split("&")[0].toString();

                    if (status === "Could not get the server status") {
                        embed.setDescription(`**${url}** 서버는 현재 **오프라인**입니다.`)
                        message.channel.send(embed)
                    }
                } catch {
                    embed.setDescription(`**${url}** 서버는 현재 **온라인**입니다.`)
                    message.channel.send(embed)
                }
            }
        });

        ping(`${args[0]}`, args[1], (error, response) => {
            if (error) throw error;
         
            console.log(response);

            const embed2 = new Discord.RichEmbed()
                .setTitle(`${args[0]} 서버 정보`)
                .setAuthor('Minecraft', 'https://media.discordapp.net/attachments/676712324387700747/676712391680983071/minecraft.png')
                .setColor(0x00ff00)
                .addField('서버 IP', response.host)
                .addField('서버 버전', response.version)
                .addField('서버 protocol 버전', response.protocolVersion)
                .addField('온라인 플레이어', response.onlinePlayers)
                .addField('서버 최대 플레이어', response.maxPlayers)

            message.channel.send(embed2)
        });
    }
};