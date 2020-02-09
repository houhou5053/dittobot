const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dittobot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Money = require("../mongoDB/mongodb.js");

module.exports = {
	name: "리더보드",
	aliases: ["leaderboard"],
	run: async (client, message, args, ops) => {
		if (message.author.id !== ops.ownerID) return;
		if (args.join(" ").toLowerCase().includes("전체")) {
			Money.findOne({
				userID: [604617640891121664, 647630912795836437],
			}).sort([
				['money']
			]).exec((err, res) => {
				if (err) console.log(err);
	
				const embed = new Discord.RichEmbed()
					.setTitle(`전체 서버`)
					.setTimestamp()
	
				let ra;
				var i = 1;
	
				ra += `1위. ${res[i].userID.username}`
			
				embed.description(`${ra}`)
	
				message.channel.send(`${embed}`)
			})
		}
	}
}