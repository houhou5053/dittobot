const Discord = require("discord.js");
const beautify = require("beautify");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    aliases: ["compile", "com", "컴파일", "comp", "ev"],
    run: async (client, message, args) => {
        this.client = client
        
        if (message.author.id !== "604617640891121664") return message.channel.send('디토봇 제작자만 가능합니다!')

        if (!args[0]) return message.channel.send('내용을 써 주세요!').then(m => m.delete(5000));

        if (args.join(" ").toLowerCase().includes("token")) return;

        let input = `const Discord = require("discord.js");\nconst moment = require('moment-timezone');\nmoment.locale('ko-KR');\nconst util = require("util")\n\n`
        input += args.join(" ")

        try {
            let output = eval(input)

            if (typeof output !== "string") output = inspect(output)
    
            if (output.length > 1820) output = `${output.substr(0, 1815)}...`

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
                .setTitle('Eval')
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(input, { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${e}\n\`\`\`\n**Type: **\n\`\`\`js\n${typeof(e)}\n\`\`\``);
            message.channel.send(embed);
        }
    }
}

async function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')}일 ${hrs.padStart(2, '0')}시간 ${min.padStart(2, '0')}분 ${sec.padStart(2, '0')}초`
}

async function counttime(time) {
    const date = new Date(time)
    const days = date.getDate()
    const hrs = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const ms = date.getTime()
    return `${days}일 ${hrs}시간 ${min}분 ${sec}초 ${ms}ms`;
}