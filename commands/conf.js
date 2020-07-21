/*
FOR GUILD SETTINGS SEE set.js !
This command is used to modify the bot's default configuration values, which affects all guilds. 
If a default setting is not specifically overwritten by a guild, changing a default here will
change it for that guild. The `add` action adds a key to the configuration of every guild in
your bot. The `del` action removes the key also from every guild, and loses its value forever.
*/
const Command = require("../base/Command.js");

class Conf extends Command {
  constructor(client) {
    super(client, {
      name: "conf",
      description: "Modyfikuje domyślną konfigurację dla wszystkich serwerów",
      category: "System",
      usage: "conf <view/get/edit> <key> <value>",
      guildOnly: true,
      aliases: ["defaults"],
      permLevel: "Bot Admin"
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
    
    // Retrieve Default Values from the default settings in the bot.
    const defaults = this.client.settings.get("default");
  
    // Adding a new key adds it to every guild (it will be visible to all of them)
    if (action === "add") {
      if (!key) return message.reply("Określ klucz do dodania");
      if (defaults[key]) return message.reply("Ten klucz już jest w domyślnych ustawieniach");
      if (value.length < 1) return message.reply("Określ wartość");

      // `value` being an array, we need to join it first.
      defaults[key] = value.join(" ");
  
      // One the settings is modified, we write it back to the collection
      this.client.settings.set("default", defaults);
      message.reply(`Pomyślnie dodano klucz **${key}** z wartością ${value.join(" ")}`);
    } else
  
    // Changing the default value of a key only modified it for guilds that did not change it to another value.
    if (action === "edit") {
      if (!key) return message.reply("Określ klucz do edycji");
      if (!defaults[key]) return message.reply("Ten klucz nie istnieje");
      if (value.length < 1) return message.reply("Określ nową wartość");

      defaults[key] = value.join(" ");

      this.client.settings.set("default", defaults);
      message.reply(`Pomyślnie edytowano klucz **${key}** na ${value.join(" ")}`);
    } else
  
    // WARNING: DELETING A KEY FROM THE DEFAULTS ALSO REMOVES IT FROM EVERY GUILD
    // MAKE SURE THAT KEY IS REALLY NO LONGER NEEDED!
    if (action === "del") {
      if (!key) return message.reply("Określ klucz do usunięcia.");
      if (!defaults[key]) return message.reply("Ten klucz nie istnieje");
    
      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(message, `Czy jesteś pewien, że chcesz permanentnie usunąć klucz **${key}** z wszystkich serwerów ? Tego **NIE MOŻNA** cofnąć.`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response)) {

        // We delete the default `key` here.
        delete defaults[key];
        this.client.settings.set("default", defaults);
      
        // then we loop on all the guilds and remove this key if it exists.
        // "if it exists" is done with the filter (if the key is present and it's not the default config!)
        for (const [guildid, conf] of this.client.settings.filter((setting, id) => setting[key] && id !== "default")) {
          delete conf[key];
          this.client.settings.set(guildid, conf);
        }
      
        message.reply(`Pomyślnie usunięto klucz **${key}**.`);
      } else
      // If they respond with n or no, we inform them that the action has been cancelled.
      if (["n","no","cancel"].includes(response)) {
        message.reply("Akcja anulowana");
      }
    } else
  
    // Display a key's default value
    if (action === "get") {
      if (!key) return message.reply("Określ klucz do wyświetlenia");
      if (!defaults[key]) return message.reply("Ten klucz nie istnieje");
      message.reply(`Wartość klucza **${key}** to aktualnie ${defaults[key]}`);

      // Display all default settings.
    } else {
      const array = [];
      Object.entries(this.client.settings.get("default")).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Domyślne ustawienia bota =
${array.join("\n")}`, {code: "asciidoc"});    }
  }
}

module.exports = Conf;