export class commanpages {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
    }

    // comman arrow function for navigate through URLS.'
    navigateURL = async (url) => await this.page.goto(url);

    async getPageTitle() {
        return (await this.page.title()).toString();
    }

    highlightAndScreenshot = async (selector) => {
        if (await selector.isVisible()) {
            await this.page.evaluate((selector) => {
                selector.style.border = '2px solid red';
            }, selector);
            //await page.screenshot({ path: screenshotPath });
        } else {
            console.log(`Element with selector ${selector} is not visible`);
        }
    }

}