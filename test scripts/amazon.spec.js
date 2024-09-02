import { test, expect } from '@playwright/test';
import { amazonIN } from '../utils/enviorment';
import { commanpages } from '../pageobjects/commanpages/commanpages';
import { amazonTitile } from '../utils/expected';
import { homePageObject } from '../pageobjects/amazonepages/homepage';



test.describe.serial('Amazon tests', () => {

    let commanPage,amazonHomePage; 

    test.beforeEach(async ({ page }) => {
        commanPage = new commanpages(page);        
        await commanPage.navigateURL(amazonIN);
        amazonHomePage = new homePageObject(page);

    });

    test("Navigate to amazon website and verify that home page displayed correctly", async () => {

        expect(await commanPage.getPageTitle()).toMatch(amazonTitile);
        await expect(amazonHomePage.searchBar()).toBeVisible(true);
        await expect(amazonHomePage.CartButton()).toBeVisible(true);
    });

    test.only("amazone: enter search valual iphone15 in Search bar", async()=>{
       await amazonHomePage.searchBar().pressSequentially("Iphone 15", { delay: 10 });
       await amazonHomePage.searchButton().click();
       //await expect(amazonHomePage.searchResult()).toHaveText("Iphone 15");
       await amazonHomePage.page.getByRole('heading', { name: 'Results', exact: true }).click();
       await amazonHomePage.page.getByText('Sort by:Featured').click();
      // await amazonHomePage.page.getByLabel('Price: Low to High').getByText('Price: Low to High').click();
    });

});