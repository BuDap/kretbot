const Command = require("../base/Command.js");
const { version, DiscordAPIError } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");

class Stats extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Komenda testowa.",
            usage: "test",
            aliases: ["test"],
            permLevel: "Bot Owner"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        const embed = new discord.RichEmbed()
        .setDescription("test")
        .setColor("random")
        
        message.channel.send(embed);
    }
}

module.exports = Stats;