module.exports = {
    name: "ditto",
    aliases: ["디토", "ditto7890", "ditto7890#8948"],
    run: async (client, message, args) => {
        var random = Math.floor(Math.random() * 4) + 1;
        
        if (random === 1) {
            message.channel.send(`**바보**`)
        } else if (random === 2) {
            message.channel.send(`**디토봇 개발자**`)
        } else if (random === 3) {
            message.channel.send(`**누구더라...**`)
        } else if (random === 4) {
            message.channel.send(`**ㄴ...ㅔ.......?**`)
        }
    }
}