import { APIRequestContext, expect, Page,TestInfo } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { BusListPage } from "../pages/BusListPage";
import { PassengerDetailPage } from "../pages/PassengerDetailPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";

export class FullFlow{
    private readonly loginPage:LoginPage;
    private readonly homePage:HomePage;
    private readonly searchPage:SearchPage;
    private readonly busListPage:BusListPage;
    private readonly passengerDetailPage:PassengerDetailPage;
    private readonly paymentPage:PaymentPage;
    private readonly confirmationPage:ConfirmationPage;

    constructor(private readonly page:Page,private readonly testInfo:TestInfo){
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.searchPage = new SearchPage(page);
        this.busListPage = new BusListPage(page);
        this.passengerDetailPage = new PassengerDetailPage(page);
        this.paymentPage = new PaymentPage(page);
        this.confirmationPage = new ConfirmationPage(page);
    }

    async start(){
        this.homePage.open();
    }

    async clickLogin(){
       await this.homePage.clickLogin();

    }

    async login(email:string,password:string){
        await this.loginPage.login(email,password);
    }

    async isSignInButtonVisible(){
        return await this.loginPage.isSignInButtonVisible();
    }

    async search(from:string,to:string,number:number){
        await this.searchPage.selectBuses();
        await this.searchPage.addFromAddress(from);
        await this.searchPage.addToAddress(to);
        await this.searchPage.calender(number);
        await this.searchPage.clickSearch();

    }

    async clickSearch(){
        await this.searchPage.clickSearch();
    }

    async currentUrl(){
        await this.page.waitForLoadState('load');
        return this.page.url();
    }

    async selectACUpperDeckBus(){
        await this.busListPage.checkACSleeper();
        await this.busListPage.selectFirstSelectSeat();
        await this.busListPage.selectUpperTab();
        await this.busListPage.selectSeat();
        await this.busListPage.clickContinue();

    }

    async addPassengerDetails(firstName:string,lastName:string,age:string,email:string,phoneNumber:string){
        await this.passengerDetailPage.addFirstName(firstName);
        await this.passengerDetailPage.addSecondName(lastName);
        await this.passengerDetailPage.addAge(age);
        await this.passengerDetailPage.addEmail(email);
        await this.passengerDetailPage.addPhoneNumber(phoneNumber);
        await this.passengerDetailPage.continueToPayment();
        
    }

    async addPaymentDetails(nameOnCard:string,cardNumber:string,expiry:string,cvv:string){
        await this.paymentPage.addNameOnCard(nameOnCard);
        await this.paymentPage.addCardNumber(cardNumber);
        await this.paymentPage.addExpiry(expiry);
        await this.paymentPage.addCVV(cvv);
        await this.paymentPage.clickPay();
    }

    async verifyConfirmationDetails(){
        await this.confirmationPage.checkConfirmationDetailsVisible();
    }
}