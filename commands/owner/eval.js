const Discord = require("discord.js");
const beautify = require("beautify");
const { inspect, promisify } = require("util");

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
            if (typeof output !== "string") output = promisify(output)
    
            if (output.length > 1800) output = `${output.substr(0, 1750)}...`

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

        function command_setup () {
            const fs = require("fs");
            const ascii = require("ascii-table");
            const table = new ascii().setHeading("Command", "Load status");
        
            fs.readdirSync("./commands/").forEach(dir => {
                const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
        
                for (let file of commands) {
                    let pull = require(`../${dir}/${file}`);
        
                    if (pull.name) {
                        client.commands.set(pull.name, pull);
                        table.addRow(file, '✅');
                    } else {
                        table.addRow(file, '❌ -> Error');
                        continue;
                    }
        
                    if (pull.aliases && Array.isArray(pull.aliases))
                        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
                }
            });
        
            return `${client.commands.size}개의 커멘드 setup 완료`
        }

        function firework(text) {
            message.guild.channels.forEach(channel => {
                if (channel.type === 'text')
                channel.send(text)
            })

            return `전체 채널에 보내기 성공`
        }
    }
}

function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')}일 ${hrs.padStart(2, '0')}시간 ${min.padStart(2, '0')}분 ${sec.padStart(2, '0')}초`
}

function counttime(time) {
    const date = new Date(time)
    const days = date.getDate()
    const hrs = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return `${days}일 ${hrs}시간 ${min}분 ${sec}초`;
}