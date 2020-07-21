const Command = require("../base/Command.js");
const { version, DiscordAPIError } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");

class Stats extends Command {
    constructor(client) {
        super(client, {
            name: "slap",
            description: "Uderzasz inną osobę.",
            usage: "slap <@osoba>",
            aliases: ["sla["],
            permLevel: "User",
            category: "Akcje"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars

        const user = message.mentions.members.first();
        if (!user) return message.reply("Musisz wybrać osobę!");

        const member = message.member;

        if (user === member) return message.reply("Nie możesz użyć tej komendy na sobie!")


        const slap = [
            `https://cdn.nekos.life/slap/slap_008.gif`,
            `https://cdn.nekos.life/slap/slap_002.gif`,
            `https://cdn.nekos.life/slap/slap_010.gif`,
            `https://cdn.nekos.life/slap/slap_011.gif`,
            `https://cdn.nekos.life/slap/slap_006.gif`,
            `https://cdn.nekos.life/slap/slap_013.gif`,
            `https://cdn.nekos.life/slap/slap_014.gif`,
            `https://cdn.nekos.life/slap/slap_001.gif`,
            `https://cdn.nekos.life/slap/slap_007.gif`,
            `https://cdn.nekos.life/slap/slap_015.gif`
        ]

        const embed = new discord.RichEmbed()
        .setAuthor(`${member.user.username} uderza ${user.user.username}`, message.author.avatarURL)
        .setImage(slap[Math.floor(Math.random() * slap.length)])
        
        message.channel.send(embed)

    }
}

module.exports = Stats;