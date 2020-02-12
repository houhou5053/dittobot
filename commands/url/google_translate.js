const Discord = require("discord.js");

module.exports = {
    name: "구글번역기",
    aliases: ["googletranslate"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x00ffff)
            .setTitle('들어가기')
            .setAuthor('Google Translate', 'https://cdn.discordapp.com/attachments/675650004068859904/677094264026431499/1024px-Google_Translate_logo.png')
            .setURL('https://translate.google.co.kr/')
        message.channel.send(embed);
    }
}