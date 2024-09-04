import fs from 'fs';
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
    searchResult = () => this.page.getByRole('heading', { name: 'Results', exact: true });

    // Locators for AddtoCart
    CartButton= () => this.page.getByLabel('items in cart');
    cartHeading = () => this.page.getByRole('heading', { name: 'Shopping Cart' });
    iphoneLink = () => this.page.getByRole('link', { name: 'Apple iPhone 15 (128 GB) - Black', exact: true });
    itemPrice = () => this.page.locator('#activeCartViewForm ul').getByText('69,999.00');
     
    //Locator for Buy section
    proceedToBuyButton = () => this.page.getByLabel('Proceed to Buy Buy Amazon');
    signInHeading = () => this.page.getByRole('heading', { name: 'Sign in' });


 //helper functions
 
 async fetchProductData(products) {

    const uniqueLinks = new Set(); 
    const productData = []; 

    for (const productHandle of products) {
        const productNameHandle = await productHandle.$('span.a-size-medium.a-color-base.a-text-normal');
        const productPriceHandle = await productHandle.$('span.a-price-whole');
        const productLinkElement = await productHandle.$('a');

        const productName = productNameHandle ? await productNameHandle.textContent() : 'N/A';
        const productPrice = productPriceHandle ? await productPriceHandle.textContent() : 'N/A';
        const productLink = productLinkElement ? await productLinkElement.getAttribute('href') : null;

        // To avoid fetching the duplicated product links
        if (productLink && !uniqueLinks.has(productLink)) {
            uniqueLinks.add(productLink);
            productData.push({
                name: productName.trim(),
                price: `₹${productPrice.trim()}`,
                link: `https://www.amazon.in${productLink}`
            });
        }
    }

 //Store data in Json file 
 fs.writeFileSync('amazon_productData.json', JSON.stringify(productData, null, 2), 'utf-8');

}

}