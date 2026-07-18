import { Page,TestInfo } from "@playwright/test";

/**
* This page contains all the locators and all the actions
*/
export class LoginPage {
    constructor(private readonly page:Page) {}
    
    /**
    * This page contains all the locators and all the actions
    */
    async login(email:string,password:string){
        await this.page.getByLabel('email').fill(email);
        await this.page.getByLabel('password').fill(password);
        await this.page.getByRole('button',{name:'Sign in'}).click();
    }

    async isSignInButtonVisible(){
        return await this.page.getByRole('button',{name:'Sign in'}).isVisible();
    }
    
}