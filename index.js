const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
const BrowserService = require('./lib/Browser');

(async () => {
    const browser = new BrowserService(process.env.USER, process.env.PASSWORD);
    try {
        await browser.open();
        await browser.login();
        await browser.spin();
        await browser.close();
    } catch (e) {
        console.log(e);
        await browser.close();
    }
})();