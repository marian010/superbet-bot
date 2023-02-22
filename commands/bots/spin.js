const BrowserService = require('../../lib/Browser');

module.exports = {
    name: "spin",
    category: "bots",
    description: "Spin SuperBet Wheel",
    ownerCommand: true,
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`Starting the process...`);
        const browser = new BrowserService(process.env.USER, process.env.PASSWORD, msg);
        try {
            await browser.open();
            await browser.login();
            await browser.spin();
            await browser.close();
        } catch (e) {
            await browser.close();
            msg.edit(e);
        }
    },
};