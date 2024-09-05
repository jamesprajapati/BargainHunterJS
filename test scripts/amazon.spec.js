import { test, expect } from '@playwright/test';
import { amazonIN } from '../utils/enviorment';
import { commanpages } from '../pageobjects/commanpages/commanpages';
import { amazonTitile } from '../utils/expected';
import { homePageObject } from '../pageobjects/amazonepages/homepage';
import { searchPageObject } from '../pageobjects/amazonepages/searchpage';
import Step from '../pageobjects/commanpages/stepfixture';


test.describe('Amazon tests', () => {

    let commanPage, amazonHomePage, amazonSearchPage;

    test.beforeEach(async ({ page }) => {
        commanPage = new commanpages(page);
        await commanPage.navigateURL(amazonIN);
        amazonHomePage = new homePageObject(page);
        amazonSearchPage = new searchPageObject(page);

    });

    test("Amazon: Navigate to amazon website and verify that home page displayed correctly", async () => {

        await Step("Verify Page title, Search Bar and Add To Cart Button is visible", async () => {
            expect(await commanPage.getPageTitle()).toMatch(amazonTitile);
            await expect(amazonHomePage.searchBar()).toBeVisible(true);
            await expect(amazonHomePage.CartButton()).toBeVisible(true);
        }, commanPage.page);

        await Step("Amazon Search: Verify Search functionality and fetch the search results", async () => {
            await amazonHomePage.searchBar().pressSequentially("Iphone 15", { delay: 10 });
            await amazonHomePage.searchButton().click();
            await expect(amazonHomePage.searchResult()).toBeVisible(true);
            await amazonHomePage.page.waitForSelector('//div[@data-component-type="s-search-result"][@data-index]');
            const products = await amazonHomePage.page.locator('//div[@data-component-type="s-search-result"][@data-index]').elementHandles();
            await amazonHomePage.fetchProductData(products);

        }, commanPage.page);

        await Step("Amazon Search: select the first product from the search results and click on add to cart button", async () => {
            await amazonSearchPage.addToCart().click();
            await test.step("Aftar adding product, Verify (in cart - remove) text is displayed", async () => {
                await expect(amazonSearchPage.removeButtonText()).toBeVisible(true);

            });
        }, commanPage.page);

        await Step("Amazon: Navigate add to cart page and verify added product is displayed with details ", async () => {
            await amazonHomePage.CartButton().click();
            await expect(amazonHomePage.cartHeading()).toBeVisible(true);
            await expect(amazonHomePage.iphoneLink()).toBeVisible(true);
            await expect(amazonHomePage.itemPrice()).toBeVisible(true);
        }, commanPage.page);
        await Step("Amazon: click on Proceed to Buy Button and verify that amazon login page is displayed", async () => {

            await amazonHomePage.proceedToBuyButton().click({
                button: 'left'
            });
            await expect(amazonHomePage.signInHeading()).toBeVisible(true);

        }, commanPage.page);


    });


});

