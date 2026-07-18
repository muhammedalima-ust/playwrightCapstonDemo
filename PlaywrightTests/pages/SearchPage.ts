import {Page} from "@playwright/test"
import { xp } from "../locators/xp";
export class SearchPage{
 
    constructor(private readonly page:Page){}
 
    async selectBuses(){
        await this.page.getByRole("tab",{name:"Buses"}).click();
    }
 
    async addFromAddress(fromAddress:string){
        await this.page.getByRole("combobox",{name:"From"}).isVisible();
        await this.page.getByRole("combobox",{name:"From"}).fill(fromAddress)
        await this.page.getByRole("listbox")
            .getByRole("option").click();
       
    }
 
     async addToAddress(toAddress:string){
        await this.page.getByRole("combobox",{name:"To"}).isVisible();
        await this.page.getByRole("combobox",{name:"To"}).fill(toAddress)
        await this.page.getByRole("listbox")
            .getByRole("option").click();
         
    }
 
    async calender(days:number){
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
 
        await xp.SELECTDATE(this.page).fill(futureDate.toISOString().split("T")[0]);
    }
 
    async clickSearch(){
       await this.page.getByRole("button",{name:"Search"}).click();
    }  

    
}