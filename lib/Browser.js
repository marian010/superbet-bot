const puppeteer = require("puppeteer");
const { selectors } = require('../utils/Selectors');

class BrowserService {

    constructor(email, password)
    {
        this.email = email;
        this.password = password;
        this.browser = null;
        this.page = null;
        this.superbetLink = 'https://superbet.ro/';
        this.superbetSpinLink = 'https://superbet.ro/spin';
        this.auth = false;
    }

    async open()
    {
        try {
            this.browser = await puppeteer.launch({
                headless: false,
                args: [
					'--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars',
				],
            })
            this.page = (await this.browser.pages())[0];
        } catch(e)
        {
            console.log(e);
        }
    }

    async login()
    {
        await this.page.goto(this.superbetLink);
        await this.page.waitForTimeout(3000);
        await this.checkCookies();
        await this.page.waitForTimeout(3000);
        await this.page.waitForSelector(selectors.loginButton);
        await this.page.click(selectors.loginButton);
        await this.page.waitForSelector(selectors.loginPasswordInput);
        await this.page.$eval(selectors.loginUsernameInput, el => el.focus());
        await this.page.keyboard.type(this.email);
        await this.page.$eval(selectors.loginPasswordInput, el => el.focus());
        await this.page.keyboard.type(this.password);
        await this.page.$eval(selectors.loginSubmitButton, el => el.click());
        await this.page.waitForTimeout(3000);
        await this.page.goto(this.superbetLink);
        await this.page.waitForTimeout(3000);
        await this.checkIfIsLoggedIn();
    }

    async checkCookies()
    {
        if (await this.page.$(selectors.cookiesAccept) !== null)
		{
			console.log("Accepting cookies...");
			await this.page.$eval(selectors.cookiesAccept, cookieBtn => cookieBtn.click());
		}
    }

    async checkIfIsLoggedIn()
    {
        if (await this.page.$(selectors.checkIfLoggedIn) !== null)
        {
            this.auth = true;
        }
    }

}

module.exports = BrowserService;