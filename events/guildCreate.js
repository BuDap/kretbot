// This event executes when a guild (server) is joined.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.user.setActivity(`dla @${this.client.user.username} help | ${this.client.guilds.size} Serwerach`, { type: "WATCHING" });
    this.client.logger.log(`Dołączył nowy serwer: ${guild.name} (${guild.id}) z ${guild.memberCount - 1} członkami`);
  }
};
