const search = require("yt-search");

module.exports = {
    name: "search",
    run: async (client, message, args, ops) => {

        search(args.join(" "), function (err, res) {
            if (err) return message.channel.send(`에러... ${err}`);
        
            let videos = res.videos.slice(0, 1);

            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [videos[0].url], ops);
        })
    }
}