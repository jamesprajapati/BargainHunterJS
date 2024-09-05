import { test, expect } from '@playwright/test';
import { flipkartCOM } from '../utils/enviorment';
import { commanpages } from '../pageobjects/commanpages/commanpages';
import { flipkartTitle } from '../utils/expected';
import Step from '../pageobjects/commanpages/stepfixture';
import fs from 'fs';
import { homePageObject } from '../pageobjects/flipkartpages/flipkart_homepage';


test.describe("Flipkart Tests", () => {

    let commanPage, flipkartHomePage;

    test.beforeEach(async ({ page }) => {
        commanPage = new commanpages(page);
        await commanPage.navigateURL(flipkartCOM);
        flipkartHomePage = new homePageObject(page);

    });

    test("Flipkart: Navigate to amazon website and verify that home page displayed correctly", async ({ page }) => {
        await Step('Flipkart: verify flipkart page is displayed and page title is correct', async () => {
            expect(await commanPage.getPageTitle()).toMatch(flipkartTitle);
            await expect(flipkartHomePage.searchBar()).toBeVisible(true);
        }, commanPage.page);

        await Step('Flipkart Search: Verify Search functionality and fetch the search results', async () => {
            await flipkartHomePage.searchBar().pressSequentially("Iphone 15", { delay: 10 });
            await flipkartHomePage.searchBar().press('Enter');
            await page.waitForLoadState('domcontentloaded');

            test.step("Flipkart: verify Search results are displayed", async () => {
                await expect(flipkartHomePage.searchFilterText()).toBeVisible(true);
                await flipkartHomePage.page.waitForSelector('.tUxRFH');
                const products = await flipkartHomePage.page.evaluate(() => {
                    const productElements = document.querySelectorAll('.tUxRFH');
                    return Array.from(productElements).map(product => {
                        const name = product.querySelector('.KzDlHZ')?.textContent || 'N/A';
                        const price = product.querySelector('.hl05eU .Nx9bqj._4b5DiR')?.textContent || 'N/A';
                        const link = product.querySelector('a.CGtC98')?.href || 'N/A';
                        return { name, price, link };
                    });
                });
                fs.writeFileSync('flipkart_productData.json', JSON.stringify(products, null, 2), 'utf-8');
            });
        }, commanPage.page);

        const firstProductLink = await flipkartHomePage.page.locator('.tUxRFH a.CGtC98').first();
        const [newPage] = await Promise.all([
            flipkartHomePage.page.context().waitForEvent('page'),
            firstProductLink.click()
        ]);

        await Step('Flipkart: select first product from search result to add in cart', async () => {
            await newPage.waitForLoadState('load');
            await expect(newPage.getByRole('heading', { name: 'Apple iPhone 15 (Blue, 128 GB)' }).locator('span')).toBeVisible(true);
            await expect(newPage.getByText('₹69,999').first()).toBeVisible(true);

            
            const cartIcon = newPage.locator('.KRzcNw');
            const AddToCartButton = newPage.getByRole('button', { name: 'ADD TO CART' });
            const isKrzcNwVisible = await cartIcon.isVisible();
            const isAddToCartVisible = await  AddToCartButton .isVisible();
            console.log('.KRzcNw visibility:', isKrzcNwVisible);
            console.log('ADD TO CART button visibility:', isAddToCartVisible);


            if (!isAddToCartVisible) {
                await cartIcon.click();
            }             
            if (!isKrzcNwVisible) {
                await AddToCartButton.click();
            } 

        }, newPage);
        await Step("Flipkart: Navigate add to cart page and verify added product is displayed with details", async () => {
            await expect(newPage.getByRole('link', { name: 'Apple iPhone 15 (Blue, 128 GB)' }).first()).toBeVisible();
            await expect(newPage.locator('span').filter({ hasText: /^₹69,999$/ })).toBeVisible();
            await expect(newPage.getByRole('button', { name: 'Place Order' })).toBeVisible(true);
        }, newPage);

        await Step("Flipkart: click on Place Order and verify that flipkart Sign In-Sign Up is displayed",async()=>{
            await newPage.getByRole('button', { name: 'Place Order' }).click();
            await expect(newPage.getByText('Login or Signup')).toBeVisible(true);
        },newPage);
    });

});