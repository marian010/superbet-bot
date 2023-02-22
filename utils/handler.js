const fs = require('fs');

const loadEvents = async function (client) {
    const folders = fs.readdirSync('./events');
    for (const folder of folders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.name) {
                console.log(`${file} event has been loaded`);
            } else {
                console.log(`${file} event failed to load`);
                continue;
            }
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

const loadCommands = async function (client) {
    let commands = [];
    const folders = fs.readdirSync('./commands');
    for (const folder of folders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            if (command.name) {
                commands.push(command);
                client.commands.set(command.name, command);
                console.log(`${file} command has been loaded`);
            } else {
                console.log(`${file} command failed to load`);
                continue;
            }
        }
    }
    client.on('ready', async () => {
        await client.application.commands.set(commands);
    });
}

module.exports = {
    loadCommands,
    loadEvents
}