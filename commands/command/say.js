const Discord = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["말해"],
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("내용을 써주세요!").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "000000" ? "FFFFFF" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "임베드") {
            const embed = new Discord.RichEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}