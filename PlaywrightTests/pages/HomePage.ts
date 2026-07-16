import {expect, Page, test} from '@playwright/test';
import { ProductCard } from './component/ProductCard';
import { Locators } from '../locators/Locators';

/**
* This page contains all the locators and all the actions
*/
export class HomePage {
    //private readonly productCard:ProductCard;
    constructor(private readonly page:Page) {
        //this.productCard= new ProductCard(page);
    }

    /**
     * This method is used for the go 
     */
    async open() {
        await this.page.goto("/")
    }

    /**
     * This method is used go to the signinPage
     */
    async clickSignIn() {
        await Locators.SIGNIN(this.page).click();
    }

    async search(search:string){
        const resp = this.page.waitForResponse((res)=>res.url().includes(`api/products?q=${search}`) && res.status()=== 200)
        await Locators.SEARCH_INPUT(this.page).click();
        await Locators.SEARCH_INPUT(this.page).fill(search);
        await Locators.SEARCH_BUTTON(this.page).click();
        await resp;
    }

    async productCardsSKU(): Promise<string[]> {
    const products = Locators.PRODUCT_CARDS(this.page);
    const count = await products.count();

    const name: string[] = [];

    for (let index = 0; index < count; index++) {
        const card = new ProductCard(products.nth(index));
        name.push(await card.getName());
    }
    return name;
    }

    async gotToProductDetailPage(search:string){
        const products = Locators.PRODUCT_CARDS(this.page);
        await Locators.PRODUCT_BUTTON(products,search).click();
    }

}