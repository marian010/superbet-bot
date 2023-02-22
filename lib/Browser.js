const puppeteer = require("puppeteer");
const fs = require('fs');
const { selectors } = require('../utils/Selectors');

const PROFILE_PATH = '../profiles';
const IS_WIN = (process.platform === "win32");
const CHROME_EXEC_PATH = IS_WIN ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe':'/usr/bin/google-chrome';

class BrowserService {

    constructor(username, password, msg)
    {
        this.username = username;
        this.password = password;
        this.msg = msg;
        this.browser = null;
        this.page = null;
        this.superbetLink = 'https://superbet.ro/';
        this.superbetSpinLink = 'https://superbet.ro/superspin';
        this.auth = false;
        this.userDataDir = PROFILE_PATH + '/' + username;
    }

    async open()
    {
        try {
            if (!(fs.existsSync(this.userDataDir)))
				fs.mkdirSync(this.userDataDir, { recursive: true });
            this.browser = await puppeteer.launch({
                executablePath: CHROME_EXEC_PATH,
                userDataDir: this.userDataDir,
                width: 1920,
				height: 1080,
                headless: true,
                args: [
                    '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure'
				],
            })
            this.page = (await this.browser.pages())[0];
            this.page.setViewport({"width": 1920 * 2, "height":1080 *2});
        } catch(e)
        {
            console.log(e);
        }
    }

    async login()
    {
        this.msg.edit('[1/2] Checking login status...')
        await this.page.goto(this.superbetLink);
        await this.page.waitForSelector('#app');
        await this.checkIfIsLoggedIn();
        if (!this.auth) {
            this.msg.edit('Doing login step...')
            await this.page.waitForTimeout(3000);
            await this.checkCookies();
            await this.page.waitForTimeout(3000);
            await this.page.waitForSelector(selectors.loginButton);
            await this.page.click(selectors.loginButton);
            await this.page.waitForSelector(selectors.loginPasswordInput);
            await this.page.$eval(selectors.loginUsernameInput, el => el.focus());
            await this.page.keyboard.type(this.username);
            await this.page.$eval(selectors.loginPasswordInput, el => el.focus());
            await this.page.keyboard.type(this.password);
            await this.page.waitForTimeout(2000);
            await this.page.$eval(selectors.loginSubmitButton, el => el.click());
            await this.page.waitForTimeout(3000);
            await this.page.goto(this.superbetLink);
            await this.page.waitForTimeout(3000);
            this.msg.edit('[2/2] Checking login status...')
            await this.checkIfIsLoggedIn();
        }
    }

    async spin()
    {
        if (this.auth) {
            this.msg.edit('Logged in successfully');
            await this.page.goto(this.superbetSpinLink, {
                waitUntil: 'networkidle2',
                timeout: 0,
            });
            const iframeElement = await this.page.waitForSelector(selectors.iframeSelector);
            const frameContent = await iframeElement.contentFrame();
            const checkTimer = await frameContent.$(selectors.checkForTimerSelector, el => el.textContent());
            if (checkTimer != null) {
                this.msg.edit('Spinning...')
                await frameContent.$eval(selectors.spinButton, el => el.click());
                await this.page.waitForTimeout(8000);
                await this.doScreenshotAndEdit('win');
            } else {
                await this.doScreenshotAndEdit('notAvailable');
                this.msg.edit(`Wheel Spin not available yet.`);
            }
        } else {
            this.msg.edit('Something went wrong. Please check your credentials');
        }
    }

    async close()
    {
        this.browser.close();
    }

    async checkCookies()
    {
        if (await this.page.$(selectors.cookiesAccept) !== null)
		{
			this.msg.edit("Accepting cookies...");
			await this.page.$eval(selectors.cookiesAccept, cookieBtn => cookieBtn.click());
		}
    }

    async doScreenshotAndEdit(type) {
        await this.page.screenshot({path: `./${type}.png`,
            clip: {
                x: 1000,
                y: 0,
                width: 1920,
                height: 1080
            },
        });
        this.msg.edit({ files: [{ attachment: `./${type}.png` }] });
    }

    async checkIfIsLoggedIn()
    {
        if (await this.page.$(selectors.checkIfLoggedIn) !== null)
        {
            this.auth = true;
            return;
        }
    }

}

module.exports = BrowserService;