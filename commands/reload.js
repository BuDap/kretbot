const Command = require("../base/Command.js");

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Ponownie ładuje polecenie, które zostało zmodyfikowane.",
      category: "System",
      usage: "reload [komenda]",
      permLevel: "Bot Admin"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (!args || args.size < 1) return message.reply("Trzeba podać polecenia do załadowania");
    
    const commands = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
    if (!commands) return message.reply(`Komenda \`${args[0]}\` nie istnieje ani nie jest skrótem.`);

    let response = await this.client.unloadCommand(commands.conf.location, commands.help.name);
    if (response) return message.reply(`Błąd podczas rozładowywania: ${response}`);

    response = this.client.loadCommand(commands.conf.location, commands.help.name);
    if (response) return message.reply(`Błąd ładowania: ${response}`);

    message.reply(`Komenda \`${commands.help.name}\` została załadowana ponownie`);
  }
}
module.exports = Reload;