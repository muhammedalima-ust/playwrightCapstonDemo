import { expect, Page } from "@playwright/test";
import { xpLocators } from "../locator/xpLocators";

export class ConfirmationPage {
    constructor(private readonly page:Page) {}

    async checkConfirmationDetailsVisible(){
        await expect(xpLocators.PNRNUMBER(this.page)).toBeVisible();
       await expect(this.page.getByRole('heading', { name: "You're all set!" })).toBeVisible();
    }

    async gotoTrip(){
        await this.page.getByRole('link', { name: 'My Trips' }).click();
        await this.page.waitForLoadState('load');
    }

    async getPNR(){
        return await xpLocators.PNRNUMBER(this.page).textContent();
    }
}
