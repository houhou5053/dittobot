module.exports = {
    name: "shutdown",
    aliases: ["종료"],
    category: "owner",
    run: async (client, message, args) => {
        if (message.author.id !== "604617640891121664") return message.channel.send('디토봇 제작자만 가능합니다!');
			await message.channel.send('디토봇 종료...');
			process.exit();
    }
}