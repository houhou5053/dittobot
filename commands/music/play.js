const ytdl = require("ytdl-core");
const Discord = require("discord.js");

module.exports = {
    name: "play",
    aliases: ["플레이", "재생", "p", "pl", "ㅔㅣ묘", "wotod", "vmffpdl"],
    run: async (client, message, args, ops) => {
        if (!message.member.voiceChannel) return message.channel.send('음성 채널에 들어가 주세요!')

        if (!args[0]) return message.channel.send('**URL**이나 **내용**을 써주세요!')

        let validate = await ytdl.validateURL(args[0])

        if (!validate) {
            let commandFile = require(`./search.js`);
            return commandFile.run(client, message, args, ops);
        }

        let info = await ytdl.getInfo(args[0]);

        let data = ops.active.get(message.guild.id) || {};

        if (!data.connection) data.connection = await message.member.voiceChannel.join();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;

        data.queue.push({
            songTitle: info.title,
            requester: message.author.username,
            url: args[0],
            announceChannel: message.channel.id,
            thumbnail: info.video_id,
            playback_time: info.timestamp
        });

        if (!data.dispatcher) play(client, message, ops, data)
        else {
            const embed = new Discord.RichEmbed()
                .setTitle(`**${info.title}**`)
                .setURL(`${args[0]}`)
                .setColor(0xffff00)
                .setTimestamp()
                .setDescription(`**${info.title}**을 재생 목록에 추가했어요!\n추가하신 분: **${message.author.username}**`)
                .setThumbnail(`https://img.youtube.com/vi/${info.video_id}/default.jpg`)
                .setFooter(message.author.username, message.author.displayAvatarURL)
            message.channel.send(embed)
        }

        ops.active.set(message.guild.id, data)
    }
}

async function play(client, message, ops, data) {
    const embed = new Discord.RichEmbed()
        .setTitle(`**${data.queue[0].songTitle}**`)
        .setURL(`${data.queue[0].url}`)
        .setColor(0xffff00)
        .setTimestamp()
        .setDescription(`**${data.queue[0].songTitle}**이(가) 곧 재생됩니다!\n추가하신 분: **${data.queue[0].requester}**`)
        .setThumbnail(`https://img.youtube.com/vi/${data.queue[0].thumbnail}/default.jpg`)
        .setFooter(message.author.username, message.author.displayAvatarURL)
    client.channels.get(data.queue[0].announceChannel).send(embed);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function() {
        finish(client, ops, this);
    })
}

function finish(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched)

        play(client, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (vc) vc.leave();
    }
}