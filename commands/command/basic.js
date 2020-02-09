module.exports = {
    run: async (client, message, args) => {
        var random = Math.floor(Math.random() * 4) + 1;
		if (random === 1) {
			message.reply('네!');
		} else if (random === 2) {
			message.reply('왜요?');
		} else if (random === 3) {
			message.channel.send(`<@${message.author.id}> 네?`);
		} else if (random === 4) {
			message.channel.send('Zzzzzz.....');
		}
    }
}