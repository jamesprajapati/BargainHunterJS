import { expect } from '@playwright/test';

export class homePageObject {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
    }

    // Locators for Search
    searchBar = () => this.page.getByPlaceholder('Search Amazon.in');
    searchButton = () => this.page.getByRole('button', { name: 'Go', exact: true });
    searchResult = () => this.page.locator(`//div[@class='a-section a-spacing-small a-spacing-top-small']/span[@class='a-color-state a-text-bold']/text()`);

    // Locators for Cart
    CartButton= () => this.page.getByLabel('items in cart');
    
    

}