const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");

module.exports = {
    name: "돈줘",
    aliases: ["돈 줘", "돈내놔", "돈 내놔", "돈받기", "돈 받기"],
    run: async (client, message, args) => {

        const embed = new Discord.RichEmbed()
            .setTitle('돈 적립!')
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor(0xffff00)

        let moneyadd = Math.floor(Math.random() * 200) + 100;

        Money.findOne({
            userID: message.author.id,
        }, (err, money) => {
            if (err) console.log(err);
            if (!money) {
                message.channel.send(`디토봇 가입을 해주세요! \`디토야 가입\``);
                return;
            } else {
                
                money.money = money.money + moneyadd;

                embed.setDescription(`💰\n**+ ${moneyadd}원**\n**${money.money}원** 보유 중`);

                console.log(`${message.author.username}님이 돈을 받으셨습니다. ID: ${message.author.id} | 적립된 돈: ${moneyadd} | 돈: ${money.money}원`);

                money.save().catch(err => console.log(err));
                message.channel.send(embed);
            }
        })
    }
}