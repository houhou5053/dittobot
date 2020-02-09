const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember } = require("../../functions.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");

module.exports = {
    name: "돈",
    aliases: ["머니", "내돈", "money", "내 돈"],
    usage: "[id, | mention]",
    run: async (client, message, args) => {
        if (!args[0]) {

            Money.findOne({
                userID: message.author.id,
            }, (err, money) => {
                if (err) console.log(err);
                if (!money) {
                    message.channel.send(`디토봇 가입을 해주세요! \`디토야 가입\``);
                    return;
                }
                console.log(`${message.author.username}님이 자신의 돈을 보셨습니다. ID: ${message.author.id} | 돈: ${money.money}원`);

                const embed = new Discord.RichEmbed()
                    .setTitle(`${message.author.username}님의 돈`)
                    .setFooter(message.author.username, message.author.displayAvatarURL)
                    .setTimestamp()
                    .setColor(0xffff00)
                    .setDescription(`💰\n**${money.money}원** 보유 중`);
                message.channel.send(embed);
            })
        }
    }
}