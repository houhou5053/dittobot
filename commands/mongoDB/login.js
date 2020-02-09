const { promptMessage } = require("../../functions.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("./mongodb.js");

const choose = ["✅", "❎"];

module.exports = {
    name: "가입",
    run: async (client, message, args) => {

        const embed = new Discord.RichEmbed()
            .setTitle('디토봇 가입')
            .setColor(0xffff00)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();

        const m = await message.reply(embed);
        const reacted = await promptMessage(m, message.author, 15, choose);

        await Login(reacted);
        await m.clearReactions();

        m.edit(embed);

        function Login(me) {
            if (me === "✅") {
                Money.findOne({
                    userID: message.author.id,
                }, (err, money) => {
                    if (err) console.log(err);
                    if (!money) {
                        const newMoney = new Money({
                            userID: message.author.id,
                            money: 0
                        })
                        newMoney.save().catch(err => console.log(err));
                    } else {
                        embed.setTitle('이미 가입이 되어 있습니다...');
                        return;
                    }
                    console.log(`${message.author.username}님이 가입하셨습니다. ID: ${message.author.id}`);
                })
                
                embed.setTitle('디토봇 가입 완료!');
                return;
            } else if (me === "❎") {
                embed.setTitle('디토봇 가입 실패...');
                console.log(`${message.author.username}님이 가입에 실패하셨습니다. ID: ${message.author.id}`);
                return;
            }
        }
    }
}