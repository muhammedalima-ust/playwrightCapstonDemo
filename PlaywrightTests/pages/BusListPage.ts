import {Page} from "@playwright/test"
import { xp } from "../locators/xp";
export class BusListPage{
 
    constructor(private readonly page:Page){}

    async checkACSleeper(){
        await this.page.getByRole('checkbox', { name: 'A/C Sleeper' }).check();
    }

    async selectFirstSelectSeat(){
        await this.page.getByRole('button', { name: 'Select Seats' }).nth(1).click();
    }

    async selectUpperTab(){
        await this.page.getByRole('tab', { name: 'Upper deck' }).click();
    }

     async selectSeat(){
        const upper = xp.AVAIALBLESLEEPERSEATUPPER(this.page).first();
        const lower = xp.AVAIALBLESLEEPERSEATLOWER(this.page).first();

        try {
            await upper.waitFor({ timeout: 800 });
            return await upper.click();
        } catch {}

        try {
            await lower.waitFor({ timeout: 800 });
            return await lower.click();
        } catch {throw new Error('No seat available');}

    }
    async clickContinue(){
       await this.page.getByRole('button', { name: 'Continue to passenger details' }).click();
    }
}