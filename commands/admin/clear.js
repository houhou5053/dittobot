module.exports = {
    name: "clear",
    aliases: ["삭제", "청소", "delete", "칟ㅁㄱ", "ㅇ딛ㅅㄷ", "tkrwp", "cjdth"],
    run: async (client, message, args) => {
        
        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply(`${message.author.username}님의 권한에 **메세지 관리 권한**이 필요해요!`).then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("디토봇의 권한에 **메세지 관리 권한**이 필요해요!").then(m => m.delete(5000));
        }
    
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || args.join(" ").includes(".")) {
            return message.reply("자연수를 입력해 주세요! `디토야 삭제 <자연수>`").then(m => m.delete(5000));
        }

        let deleteAmount;
    
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
    
        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`메세지 \`${deleted.size}\`개를 삭제 했습니다!`)).then(m => m.delete(5000))
            .catch(err => message.reply(`오류 발생... ${err}\n이런 오류가 계속 되시면 ditto7890#8948 님에게 연락 주세요!`));
    }
}