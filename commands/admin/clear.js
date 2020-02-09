module.exports = {
    name: "삭제",
    aliases: ["clear", "청소", "delete"],
    run: async (client, message, args) => {
        
        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("권한이 부족합니다!").then(m => m.delete(5000));
        }
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("삭제할 수를 입력해 주세요! `디토야 삭제 <삭제할 수>`").then(m => m.delete(5000));
        }
    
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("저한테 메세지 삭제 권한이 필요합니다!").then(m => m.delete(5000));
        }
    
        let deleteAmount;
    
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
    
        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`메세지 \`${deleted.size}\`개를 삭제 했습니다!`)).then(m => m.delete(3800))
            .catch(err => message.reply(`오류 발생... ${err}\nditto7890#8948 님에게 연락 주세요!`));

        console.log(`${message.author.username}님이 ${message.guild.name} 서버에 ${message.channel.name} 채널에서 ${deleteAmount}개에 메세지를 삭제하셨습니다. | ID: ${message.author.id}`)
    }
}