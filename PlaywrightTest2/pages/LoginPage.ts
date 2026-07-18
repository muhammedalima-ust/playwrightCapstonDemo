import { Page } from "@playwright/test";


export class LoginPage {
    constructor(private readonly page:Page) {}
    
    async login(email:string,password:string){
        await this.page.getByLabel('email').fill(email);
        await this.page.getByLabel('password').fill(password);
        await this.page.getByRole('button',{name:'Sign in'}).click();
    }
}