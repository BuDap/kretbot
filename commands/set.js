// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
const Command = require("../base/Command.js");

class SetCMD extends Command {
  constructor(client) {
    super(client, {
      name: "set",
      description: "Wyświetl lub zmień ustawienia serwera.",
      category: "System",
      usage: "set <view/get/edit> <klucz> <wartość>",
      guildOnly: true,
      aliases: ["setting", "settings"],
      permLevel: "Administrator"
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars

    // First we need to retrieve current guild settings
    const settings = message.settings;
    const defaults = this.client.settings.get("default");
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
  
    // Secondly, if a user does `-set edit <key> <new value>`, let's change it
    if (action === "edit") {
      // User must specify a key.
      if (!key) return message.reply("Określ klucz do edycji");
      // User must specify a key that actually exists!
      if (!settings[key]) return message.reply("Ten klucz nie istnieje");
      // User must specify a value to change.
      const joinedValue = value.join(" ");
      if (joinedValue.length < 1) return message.reply("Określ nową wartość");
      // User must specify a different value than the current one.
      if (joinedValue === settings[key]) return message.reply("To ustawienie już ma tą wartość!");

      // If the guild does not have any overrides, initialize it.
      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});

      // Modify the guild overrides directly.
      this.client.settings.set(message.guild.id, joinedValue, key);
      message.reply(`Pomyślnie edytowano wartość klucza **${key}** do ${joinedValue}`);
    } else
  
    // If a user does `-set del <key>`, let's ask the user if they're sure...
    if (action === "del" || action === "reset") {
      if (!key) return message.reply("Określ klucz do usunięcia (zresetowania).");
      if (!settings[key]) return message.reply("Ten klucz nie istnieje");
      if (!overrides[key]) return message.reply("Ten klucz nie ma nadpisania i już używa wartości domyślnych.");

      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(message, `Czy jesteś pewien, że chcesz zresetować \`${key}\` do domyślnych ustawień \`${defaults[key]}\`?`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response)) {

        // We reset the `key` here.
        this.client.settings.delete(message.guild.id, key);
        message.reply(`Klucz **${key}** został pomyślnie zresetowany do ustawień domyślnych.`);
      } else

      // If they respond with n or no, we inform them that the action has been cancelled.
      if (["n","no","cancel"].includes(response)) {
        message.reply(`Twoje ustawienie dla \`${key}\` zostaje w \`${settings[key]}\``);
      }
    } else
  
    // Using `-set get <key>` we simply return the current value for the guild.
    if (action === "get") {
      if (!key) return message.reply("Określ klucz do wyświetlenia");
      if (!settings[key]) return message.reply("Ten klucz nie istnieje");
      message.reply(`Wartość klucza **${key}** to aktualnie ${settings[key]}`);
      
    } else {
      // Otherwise, the default action is to return the whole configuration;
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Aktualne ustawienia serwera =\n${array.join("\n")}`, {code: "asciidoc"});
    }
  }
}

module.exports = SetCMD;