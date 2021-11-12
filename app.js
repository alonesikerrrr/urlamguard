const {
    Client
} = require('discord.js');
const client = new Client();
const keepAlive = require("./server");
const request = require('request');
let Options = {
    "Vanity_URL": "sunucu url hangi ismi koydusan onu yaz",
    "Log_Channel": "url guard log ıd",
    "Bot_Token": "buraya gerek yok envden gizlicen"
};

client.on('guildUpdate', async (oldGuild, newGuild) => {
    if (oldGuild.vanityURLCode === newGuild.vanityURLCode) return;
    let entry = await newGuild.fetchAuditLogs({
        type: 'GUILD_UPDATE'
    }).then(audit => audit.entries.first());
    if (!entry.executor || entry.executor.id === client.user.id) return;
    let channel = client.channels.cache.get(Options.Log_Channel);
    if (channel) channel.send(`${entry.executor} adlı kişi vanity url'yi çalmaya çalıştığı için banlandı ve url eski haline getirildi.`)
    if (!channel) newGuild.owner.send(`${entry.executor} adlı kişi vanity url'yi çalmaya çalıştığı için banlandı ve url eski haline getirildi.`)
    newGuild.members.ban(entry.executor.id, {
        reason: `${entry.executor.tag} adlı kişi vanity url'yi çalmaya çalıştığı için koruma tarafından banlandı.`
    });
    const settings = {
        url: `https://discord.com/api/v6/guilds/${newGuild.id}/vanity-url`,
        body: {
            code: Options.Vanity_URL
        },
        json: true,
        method: 'PATCH',
        headers: {
            "Authorization": `Bot ${process.env.token}`
        }
    };
    request(settings, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
});

client.login(process.env.token)

client.on("ready", () => {
  client.channels.cache.get("botun girceği ses kanalı ıd gir buraya").join();
 })

client.on ( "ready" , () => {
    console.log ( "Başarıyla", client.user.username + "İsmi İle Giriş Yapıldı!" );
    console.log("Alone")
} );
 client.on("ready", async () => {
client.user.setPresence({ activity: { name: "Alone" }, status: "dnd" });
})


