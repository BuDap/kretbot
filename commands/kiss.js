const Command = require("../base/Command.js");
const { version, DiscordAPIError } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");

class Stats extends Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            description: "Całujesz inną osobę.",
            usage: "kiss <@osoba>",
            aliases: ["kiss"],
            permLevel: "User",
            category: "Akcje"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars

        const user = message.mentions.members.first();
        if (!user) return message.reply("Musisz wybrać osobę!");

        const member = message.member;


        const kiss = [
            `https://cdn.nekos.life/kiss/kiss_001.gif`,
            `https://cdn.nekos.life/kiss/kiss_102.gif`,
            `https://cdn.nekos.life/kiss/kiss_131.gif`,
            `https://cdn.nekos.life/kiss/kiss_050.gif`,
            `https://cdn.nekos.life/kiss/kiss_060.gif`,
            `https://cdn.nekos.life/kiss/kiss_072.gif`,
            `https://cdn.nekos.life/kiss/kiss_091.gif`,
            `https://cdn.nekos.life/kiss/kiss_021.gif`,
            `https://cdn.nekos.life/kiss/kiss_064.gif`,
            `https://cdn.nekos.life/kiss/kiss_083.gif`
        ]

        const embed = new discord.RichEmbed()
        .setAuthor(`${member.user.username} całuje ${user.user.username}`, message.author.avatarURL)
        .setImage(kiss[Math.floor(Math.random() * kiss.length)])
        
        message.channel.send(embed)

    }
}

module.exports = Stats;