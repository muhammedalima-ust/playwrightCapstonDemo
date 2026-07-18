import { expect, Page } from "@playwright/test";
import { xp } from "../locators/xp";

/**
* This page contains all the locators and all the actions for HomePage
*/
export class HomePage {
    constructor(private readonly page:Page) {}
    
    /**
    * This method is used to open the home page
    */
    async open(){
        await this.page.goto("/",{waitUntil:'domcontentloaded'});
    }

    /**
    * This method is used to click on loginbutton and go to login page
    */
    async clickLogin(){
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async gotoTrip(){
        await this.page.getByRole('link', { name: 'My Trips' }).click();
    }

    
}