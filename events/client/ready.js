module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client
     */

    async execute(client) {
        console.log(`${client.user.tag} is now online!`);
    }
}