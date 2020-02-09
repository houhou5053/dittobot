module.exports = {
    name: "나뭐해",
    aliases: ["나 뭐해"],
    run: async (client, message, args) => {
        if (message.author.presence.game) {
            if (message.author.presence.game.name === "Custom Status") {
                message.channel.send(`${message.author.username}님은 현재 **${message.author.presence.game.state}**을(를) 하고 계시네요!`);
            } else {
                message.channel.send(`${message.author.username}님은 현재 **${message.author.presence.game.name}**을(를) 하고 계시네요!`);
            }
        } else {
            message.channel.send("모르겠어요!");
        }
    }
}