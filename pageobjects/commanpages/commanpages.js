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


}