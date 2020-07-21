const config = {
    "admins": [],
    "support": [],
    "token": "NzM0NzY1MDEwMjE5MTcxOTIx.XxWdlQ.3VMFd-d8-5nOaNWqsMDoiuobblU",
    "dashboard" : {
      "oauthSecret": "JQ7IHPgl4neOFnst0O9iLAlcbegPpZOo",
      "callbackURL": 'http://localhost:3030/callback',
      "sessionSecret": "kretowisko",
      "domain": "localhost",
      "port": 3030
    },
    defaultSettings: {
    "prefix": "-",
    "kanalLogow": "mod-log",
    "rolaMod": "Moderator",
    "rolaAdmin": "Administrator",
    "uwagiSystemowe": "true",
    "kanalPowitan": "welcome",
    "wiadPowitalna": "{{user}} dołączył na serwer ! Przywitajmy go :D",
    "powitaniaWlaczone": "false"
  },
    permLevels: [
      { level: 0,
        name: "User", 
        check: () => true
      },
      { level: 2,
        name: "Moderator",
        check: (message) => {
          try {
            const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
            if (modRole && message.member.roles.has(modRole.id)) return true;
          } catch (e) {
            return false;
          }
        }
      },
      { level: 3,
        name: "Administrator", 
        check: (message) => {
          try {
            const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
            return (adminRole && message.member.roles.has(adminRole.id));
          } catch (e) {
            return false;
          }
        }
      },
      { level: 4,
        name: "Server Owner", 
        check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
      },
      { level: 8,
        name: "Bot Support",
        check: (message) => config.support.includes(message.author.id)
      },
      { level: 9,
        name: "Bot Admin",
        check: (message) => config.admins.includes(message.author.id)
      },
      { level: 10,
        name: "Bot Owner", 
        check: (message) => message.client.appInfo.owner.id === message.author.id
      }
    ]
  };
  
  module.exports = config;
  