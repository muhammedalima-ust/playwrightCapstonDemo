import { expect, Page } from "@playwright/test";
import { xp } from "../locators/xp";

/**
* This page contains all the locators and all the actions for booking confirmation.
*/
export class ConfirmationPage {
    constructor(private readonly page:Page) {}

    async checkPnrVisible(){
        await expect(xp.PNRNUMBER(this.page)).toBeVisible();
    }

    async checkAllSetHeadingVisible(){
        await expect(this.page.getByRole('heading', { name: "You're all set!" })).toBeVisible();
    }

    async checkConfirmationDetailsVisible(){
        await this.checkPnrVisible();
        await this.checkAllSetHeadingVisible();
    }
}
