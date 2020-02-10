const shorten = require('isgd');

module.exports = {
    name: "단축",
    usage: "디토야 단축 <URL> <CustomName>",
    run: async (client, message, args, tools) => {
        if (!args[0]) return message.channel.send('**명령어 사용법**\n\`디토야 단축 <URL> [Custom Name]\`')

        if (!args[1]) {

            shorten.shorten(args[0], function(res) {
                if (res.startsWith('에러:')) message.channel.send('**URL을 넣어주세요.');

                message.channel.send(`**${res}**`);

            })
        } else {

            shorten.custom(args[0], args[1], function(res) {

                if (res.startsWith('에러:')) return message.channel.send(`**${res}**`);

                message.channel.send(`**<${res}>**`)
            })
        }
    }
}