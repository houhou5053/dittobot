const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");

module.exports = {
    name: "베팅",
    aliases: ["배팅", "betting"],
    run: async (client, message, args) => {

        Money.findOne({
            userID: message.author.id,
        }, (err, money) => {
            if (err) console.log(err);

            if (!money) {
                return message.channel,send('디토봇 가입을 해주세요! \`디토야 가입\`');
            } else {
                if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                    return message.reply("자연수를 입력해 주세요! \`디토야 베팅 <베팅할 돈>\`").then(m => m.delete(5000));
                }

                if (money.money <= 100) {
                    return message.reply('최소 100원 이상이 있어야 베팅이 가능합니다!');
                }

                if (money.money < args[0]) {
                    return message.reply('베팅한 돈이 보유 중인 돈보다 많습니다!');
                }

                if (args.join(" ").includes(".")) {
                    return message.reply(`자연수를 입력해 주세요! \`디토야 베팅 <베팅할 돈>\``)
                }

                message.channel.send(`성공하면 돈이 **2배 또는 3배!**\n실패하면 **-베팅한 돈**\n**성공 확률 50%!** (실패: 50%, 2배: 25%, 3배 25%)`);

                let yumoney = money.money;
                
                var random = Math.floor(Math.random() * 2) + 1;

                if (random === 1) {
                    var random2 = Math.floor(Math.random() * 2) + 1;
        
                    if (random2 === 1) {
                        money.money = money.money + args[0] * 2;
        
                        const embed = new Discord.RichEmbed()
                            .setTitle(`베팅 성공!`)
                            .setFooter(message.author.username, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setColor(0xffff00)
                            .setDescription(`💰\n**${args[0]}원** x **2**!\n**${yumoney}원** -> **${money.money}원**\n**${money.money}원** 보유 중`)
                        message.channel.send(embed);

                    } else if (random2 === 2) {
                        money.money = money.money + args[0] * 3;
        
                        const embed = new Discord.RichEmbed()
                            .setTitle(`베팅 성공!`)
                            .setFooter(message.author.username, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setColor(0xffff00)
                            .setDescription(`💰\n**${args[0]}원** x **3**!\n**${yumoney}원** -> **${money.money}원**\n**${money.money}원** 보유 중`)
                        message.channel.send(embed);
                    }
                } else if (random === 2) {

                    money.money = money.money - args[0];
        
                    const embed = new Discord.RichEmbed()
                        .setTitle(`베팅 실패!`)
                        .setFooter(message.author.username, message.author.displayAvatarURL)
                        .setTimestamp()
                        .setColor(0xffff00)
                        .setDescription(`💰\n**${args[0]}원** 베팅했지만 실패...\n**${yumoney}원** -> **${money.money}원**`)
                    message.channel.send(embed);
                }

                console.log(`${message.author.username}님이 베팅하셨습니다. ID: ${message.author.id} | 베팅한 돈: ${args[0]} | 돈: ${money.money}원`);

                money.save().catch(err => console.log(err));
            }
        })
    }
}