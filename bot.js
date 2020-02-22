const { ShardingManager } = require('discord.js');
require("dotenv").config({path: __dirname + "/.env"})
const manager = new ShardingManager('./index.js', {
    token: process.env.TOKEN
});

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardCreate', shard => console.log(`Create shard ${shard.id}`));