const Discord = require('discord.js');
const { config } = require("dotenv");
const client = new Discord.Client({ disableEveryone: true });
this.client = client
const prefix = '디토야 '
const realprefix = '디토야';
const ownerID = '604617640891121664';
const active = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

config({ path: __dirname + "/.env" });

const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load status");

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));

	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);

		if (pull.name) {
			client.commands.set(pull.name, pull);
			table.addRow(file, '✅');
		} else {
			table.addRow(file, '❌ -> Error');
			continue;
		}

		if (pull.aliases && Array.isArray(pull.aliases))
			pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
	}
});

console.log(table.toString());

client.login(process.env.TOKEN);

client.once("ready", () => {
	console.log(`Login ${client.user.username}\n----------------------------`)

	const botgame = [ `${client.guilds.size}개의 서버 | ${client.users.size}명의 유저 | ${client.channels.size}개의 채팅 채널과 함께하고 있어요!`, `'디토야 도움' 입력`, `이 메세지는 10초마다 랜덤으로 바뀌어요!` ]

	setInterval(() => {
		let activity = botgame[Math.floor(Math.random() * botgame.length)]
		client.user.setActivity(activity, { type: "PLAYING" })
	}, 10000)
});

client.on('error', err => console.error('websocket 연결에 오류가 발생:', err));
client.on('warn', warn => console.warn('warn:', warn));
process.on('unhandledRejection', err => console.error('Unhandled promise rejection:', err));
process.on("uncaughtException", err => console.error(err.stack || err))

client.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	
	if (message.author.id !== ownerID) console.log(`${message.author.username}: ${message.content} | ${message.guild.name} (ID: ${message.guild.id}) (CHANNEL: ${message.channel.name}, ID: ${message.channel.id}) | ${message.author.id}`)

	const args = message.content.substring(prefix.length).split(" ")
	const args2 = args.shift().toLowerCase()
	const args3 = args.slice(0).join(" ").replace(/\,/gi, ' ')
	const cmd = `${args2} ${args3}`

	if (message.content === realprefix) {
		const random = [ `네!`, `네?`, `왜 불러요?`, `왜 부르시나요?`, `네` ]
		return message.channel.send(random[Math.floor(Math.random() * random.length)])
	}

	if (message.content.startsWith(realprefix)) {
		let command = client.commands.get(cmd);
		if (!command) command = client.commands.get(client.aliases.get(cmd))
		let command2 = client.commands.get(args2)
		if (!command2) command2 = client.commands.get(client.aliases.get(args2))

		try {
			let ops = {
				ownerID: ownerID,
				active: active
			}

			if (command) command.run(client, message, args, ops)
			else if (command2) command2.run(client, message, args, ops)
			else chatbot(cmd)
		} catch (e) {
			console.log(e.stack || e)
		}
	}

	function chatbot (args) {
		const request = require('request');
	
		const headers = {
			'Authorization': `Basic ${process.env.Authorization}`,
			'Content-Type': 'application/json'
		};
	
		const dataString = {
			request: {
				query: args
			}
		}
	
		const options = {
			url: process.env.pingpong_url,
			method: 'POST',
			headers: headers,
			body: JSON.stringify(dataString)
		};
	
		request(options, callback);
	}

	async function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			let msg = JSON.parse(body, null, 1).response.replies[0].text

			if (msg.includes("\\edit")) {
				const e = await message.channel.send(msg.substr(0, msg.indexOf("\\edit")))
				return e.edit(msg.substr(Math.floor(msg.indexOf("\\edit") + "\\edit".length), msg.length))
			} else if (msg.includes("\\console")) {
				console.log(msg.substr(Math.floor(msg.indexOf("\\console") + "\\console".length), msg.length).replace(/\${message.author.username}/gi, message.author.username).replace(/\${내용}/gi, cmd))
				client.channels.get('681185303406444558').send(msg.substr(Math.floor(msg.indexOf("\\console") + "\\console".length), msg.length).replace(/\${message.author.username}/gi, message.author.username).replace(/\${내용}/gi, cmd))
				return message.channel.send(msg.substr(0, Math.floor(msg.indexOf("\\console"))))
			}

			message.channel.send(msg.replace(/\\n/gi, '\n').replace(/\${message.author.username}/gi, message.author.username).replace(/\${getStatus}/gi, getStatus()))
		}
	}

	function getStatus() {
		if (message.author.presence.game) {
            if (message.author.presence.game.name === "Custom Status") {
                return `${message.author.username}님은 현재 ${message.author.presence.game.state}을(를) 하고 계시네요!`
            } else {
                return `${message.author.username}님은 현재 ${message.author.presence.game.name}을(를) 하고 계시네요!`
            }
        } else {
            return `지금 무엇을 하시는 지 모르겠어요!`
        }
	}
});