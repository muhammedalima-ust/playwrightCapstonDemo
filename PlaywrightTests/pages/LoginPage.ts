import { Page,TestInfo } from "@playwright/test";
import { Locators } from "../locators/Locators";

/**
* This page contains all the locators and all the actions
*/
export class LoginPage {
    constructor(private readonly page:Page) {}
    
    /**
    * This page contains all the locators and all the actions
    */
    async login(email:string,password:string){
        await this.page.getByLabel('email').pressSequentially(email);
        await this.page.getByLabel('password').pressSequentially(password);
        await Locators.INPUT_FORM(this.page).locator(Locators.SIGNIN(this.page)).click();
    
    }
    
}