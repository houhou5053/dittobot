const Discord = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "프사",
    aliases: ["내프사", "내 프사"],
    usage: "[id, | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const embed = new Discord.RichEmbed()
            .setColor(0xfffffe)
            .setTitle(`${member.displayName}님의 프로필 사진`)
            .setURL(member.user.displayAvatarURL)
            .setImage(member.user.displayAvatarURL);
        message.channel.send(embed);
    }
}