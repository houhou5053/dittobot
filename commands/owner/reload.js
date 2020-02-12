const fs = require("fs");
const Discord = require("discord.js")

module.exports = {
    name: "리로드",
    aliases: ["reload", "ㄱ디ㅐㅁㅇ"],
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.channel.send('디토봇 제작자만 가능합니다!')

        const m = await message.channel.send(new Discord.RichEmbed().setTitle(`${client.emojis.find(x => x.name == "loading_gif")} 디토봇의 ${client.commands.size}개의 파일을 리로드 중...\n${client.emojis.find(x => x.name == "loading_gif")} index.js 외 1개의 파일 리로드 중...\n${client.emojis.find(x => x.name == "loading_gif")} command.js 파일 리로드 중...`).setColor(0xffff00))

        fs.readdirSync("./commands/").forEach(dir => {
            const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
    
            for (let file of commands) {
                let pull = require(`../${dir}/${file}`);

                if (pull.name) {
                    delete require.cache[require.resolve(`../${dir}/${file}`)]
                    client.commands.delete(pull)
                    client.commands.set(pull.name, pull)
                } else {
                    continue;
                }
            }
        });

        m.edit(new Discord.RichEmbed().setTitle(`✅ 디토봇의 ${client.commands.size}개의 파일을 리로드 완료!\n${client.emojis.find(x => x.name == "loading_gif")} index.js 외 1개의 파일 리로드 중...\n${client.emojis.find(x => x.name == "loading_gif")} command.js 파일 리로드 중...`).setColor(0xffff00))

        let pull = require(`../../index.js`)

        if (pull.name) {
            delete require.cache[require.resolve(`../../index.js`)]
            client.commands.delete(pull)
            client.commands.set(pull.name, pull)
        }

        let pull2 = require(`../../functions.js`)

        if (pull2.name) {
            delete require.cache[require.resolve(`../../functions.js`)]
            client.commands.delete(pull2)
            client.commands.set(pull2.name, pull2)
        }

        m.edit(new Discord.RichEmbed().setTitle(`✅ 디토봇의 ${client.commands.size}개의 파일을 리로드 완료!\n✅ index.js 외 1개의 파일 리로드 완료!\n${client.emojis.find(x => x.name == "loading_gif")} command.js 파일 리로드 중...`).setColor(0xffff00))

        let pull3 = require(`../../handler/command.js`)

        if (pull3.name) {
            delete require.cache[require.resolve(`../../handler/command.js`)]
            client.commands.delete(pull3)
            client.commands.set(pull3.name, pull3)
        }

        m.edit(new Discord.RichEmbed().setTitle(`✅ 디토봇의 ${client.commands.size}개의 파일을 리로드 완료!\n✅ index.js 외 1개의 파일 리로드 완료!\n✅ command.js 파일 리로드 완료!`).setColor(0xffff00))
    }
}