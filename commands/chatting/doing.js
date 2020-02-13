module.exports = {
	name: "doing",
	aliases: ["뭐하니", "뭐해"],
    run: async (client, message, args) => {
        var random = Math.floor(Math.random() * 2) + 1;
		if (random === 1) {
			message.channel.send(`${message.author.username}님과 대화하고 있어요!`);
		} else if (random === 2) {
			message.channel.send(`**${client.user.presence.game.name}**을(를) 하고 있어요!`);
		} else if (random === 3) {
			message.channel.send(`**게임**을 하고 있어요(?)`)
		}
    }
}