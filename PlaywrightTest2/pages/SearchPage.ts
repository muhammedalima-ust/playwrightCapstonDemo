import { Page } from "@playwright/test";
import { xpLocators } from "../locator/xpLocators";


export class SearchPage {
    constructor(private readonly page:Page) {}
    
    async OpenWebsite(){
        await this.page.goto("/",({waitUntil:'domcontentloaded'}));
    }

    async clickLogin(){
         await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async addFrom(fromLocation:string){
        await this.page.getByRole("combobox",{name:"From"}).isVisible();
        await this.page.getByRole("combobox",{name:"From"}).fill(fromLocation)
        await this.page.getByRole("listbox")
            .getByRole("option").click();
    }

    async addTo(toLocation:string){
        await this.page.getByRole("combobox",{name:"To"}).isVisible();
        await this.page.getByRole("combobox",{name:"To"}).fill(toLocation)
        await this.page.getByRole("listbox")
            .getByRole("option").click();
    }

    async selectDate(date:string){
        await xpLocators.SELECTDATE(this.page).fill(date);
    }
 
    async clickSearch(){
       await this.page.getByRole("button",{name:"Search"}).click();
    }  

}