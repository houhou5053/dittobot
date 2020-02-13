const Discord = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["✌", "✊", "✋"];

module.exports = {
    name: "rps",
    aliases: ["가위 바위 보", "가위바위보"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0xfffffe)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTitle("**반응을 눌러서 가위바위보!**")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setTitle(`${result}`)
            .setDescription(`**${reacted} vs ${botChoice}**`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "✊" && clientChosen === "✌") ||
                (me === "✋" && clientChosen === "✊") ||
                (me === "✌" && clientChosen === "✋")) {
                    return "이기셨네요!";
            } else if (me === clientChosen) {
                return "비겼네요!";
            } else {
                return "지셨네요!";
            }
        }
    }
}