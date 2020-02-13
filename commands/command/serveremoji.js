module.exports = {
    name: "serveremoji",
    aliases: ["서버 이모티콘", "서버이모지", "서버이모티콘", "서버 이모지"],
    run: async (client, message, args) => {
        if (message.guild.emojis.size === 0) {
			message.channel.send(`서버 이모지가 없습니다.`)
		} else {
			message.channel.send(`${message.guild.emojis.map(e => e.toString()).join(" ")}`);
		}
    }
}