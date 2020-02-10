const Discord = require("discord.js");
const beautify = require("beautify");
const translate = require("@vitalets/google-translate-api");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    run: async (client, message, args) => {
        if (message.author.id !== "604617640891121664") return;

        if (!args[0]) {
            return message.channel.send('내용을 써 주세요!')
                .then(m => m.delete(5000));
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) return;

            let input = `const Discord = require("discord.js");\nconst moment = require('moment-timezone');\nmoment.locale('ko-KR');\n\n`
            input += args.join(" ")

            //let input = args.join(" ")

            let output = eval(input)

            if (typeof output !== "string") output = inspect(output)

            if (output.size > 1024) output = `${output.substr(0, 1024)}...`


            const embed = new Discord.RichEmbed()
                .setTitle('Eval')
                .setColor(0x00ff00)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                //.addField('📥 Input', `\`\`\`js\n${input}\n\`\`\``)
                //.addField('📤 Output', `\`\`\`js\n${output}\n\`\`\``)
                .setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(input, { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${output}\n\`\`\`\n**Type: **\n\`\`\`js\n${typeof(output)}\n\`\`\``)

            //message.channel.send(`**Output: **\n\`\`\`js\n${output}\n\`\`\``)
            message.channel.send(embed)

        } catch (e) {
            let embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setTitle('\:x: Error!')
                .setFooter(client.user.username, client.user.displayAvatarURL);

            translate(`${e}`, {
                to: translate.languages.getCode("korean")
            }).then(res => {
                embed.setDescription(`${e}\n${res.text}`);
                message.channel.send(embed);
            })
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) return;

            //const toEval = args.join(" ");
            //const evaluated = eval(toEval);

            let toEval = `const Discord = require("discord.js");\nconst moment = require('moment-timezone');\nmoment.locale('ko-KR');\n\n`
            toEval += args.join(" ")

            let evaluated = eval(toEval);

            const embed = new Discord.RichEmbed()
                .setColor(0x00ff00)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setTitle("Eval")
                .setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(toEval, { format: "js" })}\n\`\`\`\n**📤 Output: **\`\`\`js\n${evaluated}\n\`\`\`\n**Type: **\n\`\`\`js\n${typeof(evaluated)}\n\`\`\``)
                //.addField("To Evalaute: ", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
                //.addField('Evaluated: ', evaluated)
                //.addField('Type', typeof(evaluated));

            message.channel.send(embed);
        } catch (e) {
            let embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setTitle('\:x: Error!')
                .setFooter(client.user.username, client.user.displayAvatarURL);

            translate(`${e}`, {
                to: translate.languages.getCode("korean")
            }).then(res => {
                embed.setDescription(`${e}\n${res.text}`);
                message.channel.send(embed);
            })
        }
    }
}