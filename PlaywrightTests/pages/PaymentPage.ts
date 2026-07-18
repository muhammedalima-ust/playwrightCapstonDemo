import { Page } from "@playwright/test";

/**
* This page contains all the locators and all the actions for payment details.
*/
export class PaymentPage {
    constructor(private readonly page:Page) {}

    async addNameOnCard(nameOnCard:string){
        await this.page.getByRole('textbox', { name: 'Name on card' }).fill(nameOnCard);
    }

    async addCardNumber(cardNumber:string){
        await this.page.getByRole('textbox', { name: 'Card number' }).fill(cardNumber);
    }

    async addExpiry(expiry:string){
        await this.page.getByRole('textbox', { name: 'Expiry' }).fill(expiry);
    }

    async addCVV(cvv:string){
        await this.page.getByRole('textbox', { name: 'CVV' }).fill(cvv);
    }

    async clickPay(){
        await this.page.getByRole('button', { name: 'Pay ₹' }).click();
    }

    async getPaymentErrorMessage() {
    return this.page.getByRole('alert');
    }
}
