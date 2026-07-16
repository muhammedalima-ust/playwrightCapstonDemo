import { Page } from "@playwright/test";
import { Locators } from "../locators/Locators";

export class CartPage {
    constructor(private readonly page:Page) {}

    async checkout(){
        await Locators.CHECKOUT_BUTTON(this.page).click();
    }



}