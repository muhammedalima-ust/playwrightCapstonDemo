import { Page } from "@playwright/test";
import { Locators } from "../locators/Locators";

export class CheckOutPage {
    constructor(private readonly page:Page) {}

    async addAddress(address:string){
        await Locators.ADDRESS_INPUT(this.page).pressSequentially(address);
    }

    async placeOrder(){
        await Locators.PLACE_ORDER_BUTTON(this.page).click();
    }



}