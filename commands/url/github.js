const Discord = require("discord.js");

module.exports = {
    name: "깃허브",
    aliases: ["github"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setTitle('들어가기')
            .setAuthor('Github', 'https://lh3.googleusercontent.com/proxy/GhpGwJ_8k_6NIGcGIRH3vuk9NenNPEzkxwas_fD9x9TdcxA58c9oaejJ0FR__9YWy3IcJLXcsjGnOlGOAXEZxvKXGwfZw0pyx4llNe-RpFfvP5OuL4a6WYmIx9KBK0_i3TakInlr_wCHVQxdTHF8hy0WFehZxlb_Am3a7Oflieb3iRRnWHwQANg0gK09-EndOAwolH4hxXtqySdILwJIaqU_HyFyitXwoeV603pvW5EsxkJQ6AKrBCrF0lWqtSumQ8k_-2pBI1gTHV8v-GNmVh4jl0T6BTpbdQo4Hrk')
            .setURL('https://github.com/')
        message.channel.send(embed);
    }
}