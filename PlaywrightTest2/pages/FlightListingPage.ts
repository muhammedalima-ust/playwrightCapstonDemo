import { Page } from "@playwright/test";


export class FlightListingPage {
    constructor(private readonly page:Page) {}

    async clickFirstCard(){
       await this.page.getByRole('button', { name: 'Book' }).first().click();
    }
}