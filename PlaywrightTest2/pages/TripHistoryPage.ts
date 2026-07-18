import { Page } from "@playwright/test";
import { xpLocators } from "../locator/xpLocators";


export class TripHistoryPage {
    constructor(private readonly page:Page) {}

    async cancelLastTrip(){
       await this.page.getByRole('button',{name: "Cancel"}).first().click();
    }

        
        async verifyTripStatus(pnr: string): Promise<string> {

            const tripCard = await xpLocators.TRIPCARDUSINGPNR(this.page, pnr);

            const status = await xpLocators.STATUS(tripCard).first().textContent();

            return status!;
        }



}