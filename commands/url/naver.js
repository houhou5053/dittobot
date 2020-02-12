const Discord = require("discord.js");

module.exports = {
    name: "네이버",
    aliases: ["naver"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setAuthor('Naver', 'https://images-ext-2.discordapp.net/external/42ygoEiRXm11O1d1fr9HLm5qcr0avgCd7zquMYh-9jU/http/pluspng.com/img-png/naver-logo-png-naver-300.png')
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setURL('https://www.naver.com/')
        message.channel.send(embed);
    }
}