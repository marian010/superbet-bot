require("dotenv").config();
const BrowserService = require('./lib/Browser');

(async () => {
    console.log(process.env.EMAIL);
    const browser = new BrowserService(process.env.EMAIL, process.env.PASSWORD);
    try {
        await browser.open();
        await browser.login();
        await browser.spin();
    } catch (e) {
        console.log(e);
    }
})();