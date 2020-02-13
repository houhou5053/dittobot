module.exports = {
    name: "hello",
    aliases: ["안녕", "hi", "안녕하세요", "ㅎㅇ", "ㅎ2"],
    run: async (client, message, args) => {
        var random = Math.floor(Math.random() * 3) + 1

        if (random === 1) {
            message.reply('안녕하세요!');
        } else if (random === 2) {
            message.reply('ㅎ2!')
        } else if (random === 3) {
            message.reply('ㅎㅇ요!')
        }
    }
}