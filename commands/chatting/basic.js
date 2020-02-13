module.exports = {
    run: async (client, message, args) => {
        var random = Math.floor(Math.random() * 3) + 1;
		if (random === 1) {
			message.reply('\`디토야 도움\`');
		} else if (random === 2) {
			message.reply('왜요?');
		} else if (random === 3) {
			message.channel.send(`<@${message.author.id}> 네?`);
		}
    }
}