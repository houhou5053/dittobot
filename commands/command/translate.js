const Discord = require("discord.js");
const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: "번역",
    run: async (client, message, args) => {
		const embed = new Discord.RichEmbed()
			.setTitle('Google 번역기')
			.setFooter(message.author.username, message.author.displayAvatarURL)
			.setColor(0xfffffe)
			.setTimestamp();

		if (!args[0]) return message.reply(`디토야 번역 <번역할 내용> 을 써주세요!`);

		const msgArgs = args.slice(0).join(" ");

        translate(`${msgArgs}`, {
            to: translate.languages.getCode("English")
        }).then(res => {
			embed.setDescription(`**${res.text}**`);
            message.channel.send(embed);
        })
    }
}