const { Client, Embed } = require("./../dist/index")

const client = new Client({
    intents: 1
})

client.on("interactionCreate", (interaction) => {
    var command = interaction.name
    console.log(command)
    interaction.reply({content: "Pesan anda telah masuk", embeds: [new Embed().setTitle("Pengetestan lumine-discord.js").setDescription("Pebgujian jika melihat ini maka pesan anda terkirim dengan baik\n --Kanaka Nakazawa")]})
})

client.login(process.env.token)