export class homePageObject {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
    }

    // Locators
    //search
     
    searchBar = ()=> this.page.getByPlaceholder('Search for Products, Brands');
    searchFilterText = () => this.page.getByText('Price -- High to Low');

    //cart
    goToCart = ()=> this.page.getByRole('button', { name: 'GO TO CART' });
    placeOrder = () => this.page.getByRole('button', { name: 'Place Order' });

}