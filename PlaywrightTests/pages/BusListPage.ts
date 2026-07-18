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
        await xp.AVAIALBLESLEEPERSEAT(this.page).nth(1).click();
    }
    async clickContinue(){
       await this.page.getByRole('button', { name: 'Continue to passenger details' }).click();
    }
}