import { Page } from "@playwright/test";
import { xpLocators } from "../locator/xpLocators";


export class SeatPage {
    constructor(private readonly page:Page) {}

    async clickFirstSeat(){
       await xpLocators.FIRSTSEAT(this.page).first().click();
    }

    async continueToPassenger(){
        await this.page.getByRole('button', { name: 'Continue to passenger details' }).click();
    }
}