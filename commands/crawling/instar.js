const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

const fetch = require("node-fetch");

module.exports = {
    name: "instar",
    aliases: ["인스타", "insta"],
    category: "category",
    run: async (client, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("검색할 인스타그램 유저를 입력해 주세요!")
                .then(m => m.delete(5000));
        }

        const url = `https://www.instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        if (!res.graphql.user.username) {
            return message.reply("인스타그램 계정을 찾을 수 없습니다.")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new Discord.RichEmbed()
            .setAuthor('Instargram', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/220px-Instagram_logo_2016.svg.png')
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setColor(0xff00bd)
            .setTitle(`${account.full_name} 님의 정보`)
            .setURL(account.external_url_linkshimmed)
            .setThumbnail(account.profile_pic_url_hd)
            .setDescription('**계정 정보**')
            .addField('계정 이름', stripIndents`**${account.username}**`)
            .addField('이름', stripIndents`**${account.full_name}**`)
            .addField('소개글', `**${account.biography.length ==0 ? "없음" : account.biography}**`)
            .addField('비공개 여부', `**${account.is_private ? "비공개 🔐" : "공개 🔓"}**`)
            .addField('프로필 주소', `**https:\//www.instagram.com/${name}**`)

        message.channel.send(embed);

    }
}