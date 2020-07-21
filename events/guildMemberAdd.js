// This event executes when a new member joins a server. Let's welcome them!

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
  // Load the guild's settings
    const settings = this.client.getSettings(member.guild.id);
  
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.powitaniaWlaczone !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    const wiadPowitalna = settings.wiadPowitalna.replace("{{user}}", member.user.tag);

    // Send the welcome message to the welcome channel.
    // There's a place for more configs here.
    member.guild.channels.find("name", settings.kanalPowitan).send(wiadPowitalna).catch(console.error);
  }
};
