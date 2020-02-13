const Discord = require("discord.js");
const beautify = require("beautify");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    aliases: ["compile", "com", "컴파일", "comp", "ev"],
    run: async (client, message, args) => {
        if (message.author.id !== "604617640891121664") return message.channel.send('디토봇 제작자만 가능합니다!')

        if (!args[0]) return message.channel.send('내용을 써 주세요!').then(m => m.delete(5000));

        try {
            if (args.join(" ").toLowerCase().includes("token")) return;

            let input = `const Discord = require("discord.js");\nconst moment = require('moment-timezone');\nmoment.locale('ko-KR');\nconst util = require("util")\nconst ytdl = require("ytdl-core")\n\n`
            input += args.join(" ")

            let output = eval(input)

            if (typeof output !== "string") output = inspect(output)

            if (output.length > 2047) output = `${output.substr(0, 2000)}...`


            const embed = new Discord.RichEmbed()
                .setTitle('Eval')
                .setColor(0x00ff00)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(input, { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${output}\n\`\`\`\n**Type: **\n\`\`\`js\n${typeof(output)}\n\`\`\``)

            message.channel.send(embed)

        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setTitle('\:x: Error!')
                .setFooter(client.user.username, client.user.displayAvatarURL);

            embed.setDescription(`${e}`);
            message.channel.send(embed);
        }
    }
}