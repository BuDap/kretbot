const Command = require("../base/Command.js");
const { version, DiscordAPIError } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");

class Stats extends Command {
    constructor(client) {
        super(client, {
            name: "pat",
            description: "Głaszczesz inną osobę.",
            usage: "pat <@osoba>",
            aliases: ["pat"],
            permLevel: "User",
            category: "Akcje"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars

        const user = message.mentions.members.first();
        if (!user) return message.reply("Musisz wybrać osobę!");

        const member = message.member;

        if (user === member) return message.reply("Nie możesz użyć tej komendy na sobie!")


        const pat = [
            `https://cdn.nekos.life/pat/pat_001.gif`,
            `https://cdn.nekos.life/pat/pat_062.gif`,
            `https://cdn.nekos.life/pat/pat_036.gif`,
            `https://cdn.nekos.life/pat/pat_025.gif`,
            `https://cdn.nekos.life/pat/pat_074.gif`,
            `https://cdn.nekos.life/pat/pat_071.gif`,
            `https://cdn.nekos.life/pat/pat_033.gif`,
            `https://cdn.nekos.life/pat/pat_050.gif`,
            `https://cdn.nekos.life/pat/pat_007.gif`,
            `https://cdn.nekos.life/pat/pat_061.gif`
        ]

        const embed = new discord.RichEmbed()
        .setAuthor(`${member.user.username} głaszcze ${user.user.username}`, message.author.avatarURL)
        .setImage(pat[Math.floor(Math.random() * pat.length)])
        
        message.channel.send(embed)

    }
}

module.exports = Stats;