const Discord = require('discord.js');
const { config } = require("dotenv");
const client = new Discord.Client({
    disableEveryone: true
});
const prefix = '디토야 ';
const realprefix = '디토야';
const ownerID = '604617640891121664';
const active = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`) (client);
});

client.once("ready", () => {
    console.log(`NAME: ${client.user.username}`)
    console.log(`ID: ${client.user.id}`)
    console.log(`${client.users.size}명이 봇을 사용하는 중`)
    console.log(`${client.channels.size}개의 채팅 채널에 접속 중`)
	console.log(`${client.guilds.size}개의 서버와 함께하는 중`)
	console.log('--------------------------------');

	const botgame = [ `${client.guilds.size}개의 서버 | ${client.users.size}명의 유저 | ${client.channels.size}개의 채팅 채널과 함께하고 있어요!`, `'디토야 도움' 입력`, `이 메세지는 10초마다 랜덤으로 바뀌어요!` ]

	setInterval(() => {
		let activity = botgame[Math.floor(Math.random() * botgame.length)]
		client.user.setActivity(activity, { type: "PLAYING" })
	}, 10000)
});

client.on('error', error => {
	console.error('The websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	const args = message.content.substring(prefix.length).split(" ")

	if (message.content.startsWith(realprefix)) {
		if (message.author.id !== ownerID) {
			console.log(`${message.author.username}: ${message.content} | ID: ${message.author.id}`)
		}
		
		if (message.content === realprefix) {
			let commandName = require("./commands/command/basic.js")
			return commandName.run(client, message, args)
		}

		if (message.content.startsWith(realprefix)) {
			const args2 = args.slice(1).join(" ")
			const args3 = args.shift().toLowerCase()
			const args4 = args2.replace( /\,/gi, ' ')
			const cmd = `${args3} ${args4}`
	
			let command = client.commands.get(cmd);
			let command2 = client.commands.get(args3);
			if (!command) command = client.commands.get(client.aliases.get(cmd));
			if (!command2) command2 = client.commands.get(client.aliases.get(args3))
	
			try {
				let ops = {
					ownerID: ownerID,
					active: active
				}
	
				if (command)
					command.run(client, message, args, ops);
	
				if (command2)
					command2.run(client, message, args, ops);
			} catch (e) {
				console.log(e.stack)
			}
		}
	}
});

client.login(process.env.TOKEN);