export class searchPageObject {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
    }

    searchResultText = ()=> this.page.getByRole('heading', { name: 'Results', exact: true });
    searchProducts = ()=> this.page.locator('//div[@data-component-type="s-search-result"][@data-index]');
    removeButtonText = () => this.page.getByText('in cart-Remove');


    productNameHandle =(productHandle)=>  productHandle.$('span.a-size-medium.a-color-base.a-text-normal');
    productPriceHandle =(productHandle)=>  productHandle.$('span.a-price-whole');
    productLinkElement =(productHandle)=>  productHandle.$('a');

    //Add to cart for Product Search
     addToCart =()=> this.page.locator('//*[@id="a-autoid-1-announce"]'); 

}    