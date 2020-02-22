const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["도움말", "도움", "도와줘", "헬프"],
    run: async (client, message, args) => {
        message.author.send(`도움말은 현재 업데이트 중입니다!`)
        message.channel.send(`<@${message.author.id}> **DM**을 봐주세요! (개인 메세지)`);
    }
}