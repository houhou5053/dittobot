const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");
const { promptMessage } = require("../../functions.js");
const choose = ["✅", "❎"];

module.exports = {
    name: "올인",
    aliases: ["allin"],
    run: async (client, message, args) => {
		Money.findOne({
			userID: message.author.id,
		}, (err, money) => {
			if (err) console.log(err);

			if (!money) {
				message.channel.send('디토봇 가입을 해주세요! \`디토야 가입\`');
				return;
			}

			if (money.money < 100) {
				message.reply('최소 100원 이상이 있어야 올인이 가능합니다!');
				return;
			}
			global = money.money
		});

		if (global < 100) {
			message.reply('최소 100원 이상이 있어야 올인이 가능합니다!');
			return;
		}

		const m = await message.channel.send('진짜로 올인을 하실 건가요?')
		
		const reacted = await promptMessage(m, message.author, 15, choose)

		await allin(reacted)

		await m.clearReactions();

		function allin(me) {
			if (me === "✅") {
				Money.findOne({
					userID: message.author.id,
				}, (err, money) => {
					if (err) console.log(err);

					message.channel.send(`성공하면 돈이 **2배 또는 3배!**\n실패하면 **0원!**\n**성공 확률 50%!** (실패: 50%, 2배: 25%, 3배 25%)`);

					let yumoney = money.money;

					random = Math.floor(Math.random() * 2) + 1;
		
					if (random === 1) {
						var random2 = Math.floor(Math.random() * 2) + 1;
			
						if (random2 === 1) {
							money.money = money.money * 2;
				
							const embed = new Discord.RichEmbed()
								.setTitle(`올인 성공!`)
								.setFooter(message.author.username, message.author.displayAvatarURL)
								.setTimestamp()
								.setColor(0xffff00)
								.setDescription(`💰\n**${yumoney}원** x **2**!\n**${money.money}원** 보유 중`)
							message.channel.send(embed);
						} else if (random2 === 2) {
							money.money = money.money * 3;
			
							const embed = new Discord.RichEmbed()
								.setTitle(`올인 성공!`)
								.setFooter(message.author.username, message.author.displayAvatarURL)
								.setTimestamp()
								.setColor(0xffff00)
								.setDescription(`💰\n**${yumoney}원** x **3**!\n**${money.money}원** 보유 중`)
							message.channel.send(embed);
						}
					} else if (random === 2) {
						money.money = 0;
			
						const embed = new Discord.RichEmbed()
						.setTitle(`올인 실패...`)
						.setFooter(message.author.username, message.author.displayAvatarURL)
						.setTimestamp()
						.setColor(0xffff00)
						.setDescription(`💰\n**${yumoney}원** -> **${money.money}원**...\n**${money.money}원** 보유 중`)
					message.channel.send(embed);
					}
		
					console.log(`${message.author.username}님이 올인하셨습니다. ID: ${message.author.id} | 돈: ${yumoney}원 -> 돈: ${money.money}원`);
					money.save().catch(err => console.log(err));
					return;
				})
			} else if (me === "❎") {
				message.channel.send('올인이 취소되었습니다!');
				return;
			}
		}
    }
}