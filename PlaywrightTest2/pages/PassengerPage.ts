import { Page } from "@playwright/test";

export class PassengerPage {
    constructor(private readonly page:Page) {}

    async addFirstName(FirstName:string){
        await this.page.getByRole('textbox', { name: 'First name' }).fill(FirstName);
    }

    async addSecondName(LastName:string){
        await this.page.getByRole('textbox', { name: 'Last name' }).fill(LastName);
    }

    async addAge(age:string){
        await this.page.getByRole('spinbutton', { name: 'Age' }).fill(age);
    }

    async addEmail(email:string){
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    }

    async addPhoneNumber(phoneNumber:string){
        await this.page.getByRole('textbox', { name: 'Phone number' }).fill(phoneNumber);
    }

     async continueToPayment(){
        await this.page.getByRole('button', { name: 'Continue to payment' }).click();
    }
    
    
}