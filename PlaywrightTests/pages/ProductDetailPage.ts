import { Page } from "@playwright/test";
import { Locators } from "../locators/Locators";

export class ProductDetailPage {
    constructor(private readonly page:Page) {}

    async addtoCart(){
        await Locators.ADD_TO_CART_BUTTON(this.page).click();
    }
}