const Discord = require("discord.js")
const request = require("request")
//const api = require("../../../api/api.json")

module.exports = {
    name: "api",
    run: async (client, message, args) => {
        //message.channel.send(JSON.stringify(api))

        /*var url = 'https://dittobot.ga/'

        request(url, function(error, dd, html) {
            if (!error) {
                message.channel.send(`\`\`\`json\n${html}\n\`\`\``)
                message.channel.send(new Discord.RichEmbed().setTitle(`${JSON.parse(html, null, 1).client.username} 정보`))
            }
        })*/
    }
}