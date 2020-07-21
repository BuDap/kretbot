const Command = require("../base/Command.js");

class MyLevel extends Command {
  constructor(client) {
    super(client, {
      name: "mylevel",
      description: "Wyświetla poziom uprawnień dla Twojej lokalizacji.",
      usage: "mylevel",
      guildOnly: true
    });
  }

  async run(message, args, level) {
    const friendly = this.client.config.permLevels.find(l => l.level === level).name;
    message.reply(`Twój poziom uprawnień to: ${level} - ${friendly}`);
  }
}

module.exports = MyLevel;