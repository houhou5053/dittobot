const fs = require("fs");
const Discord = require("discord.js")

module.exports = {
    name: "reload",
    aliases: ["리로드", "ㄱ디ㅐㅁㅇ"],
    category: "onwer",
    run: async (client, message, args, ops) => {
        if (message.author.id !== ops.ownerID) return message.channel.send('디토봇 제작자만 가능합니다!')

        const m = await message.channel.send(new Discord.RichEmbed().setTitle(`${client.emojis.find(x => x.name == "loading_gif")} 디토봇의 모든 파일을 리로드 중... (${client.commands.size}개)`).setColor(0xffff00))

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
        
        m.edit(new Discord.RichEmbed().setTitle(`✅ 디토봇의 모든 파일을 리로드 완료! (${client.commands.size}개)`).setColor(0xffff00))
    }
}