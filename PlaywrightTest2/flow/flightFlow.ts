import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SearchPage } from "../pages/SearchPage";
import { FlightListingPage } from "../pages/FlightListingPage";
import { SeatPage } from "../pages/SeatPage";
import { PassengerPage } from "../pages/PassengerPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ConfirmationPage } from "../pages/ConformationPage";
import { TripHistoryPage } from "../pages/TripHistoryPage";

export class flightFlow {
    private readonly loginPage:LoginPage;
    private readonly searchPage:SearchPage;
    private readonly flightListingPage:FlightListingPage;
    private readonly passengerPage:PassengerPage;
    private readonly seatPage:SeatPage;
    private readonly conformationPage:ConfirmationPage;
    private readonly tripHistoryPage:TripHistoryPage;
    private readonly paymentPage:PaymentPage;
    constructor(private readonly page:Page) {
         /**
        * Every Page is intialised 
        */
        this.loginPage = new LoginPage(page);
        this.searchPage = new SearchPage(page);
        this.flightListingPage = new FlightListingPage(page);
        this.seatPage = new SeatPage(page);
        this.passengerPage=new PassengerPage(page);
        this.paymentPage = new PaymentPage(page);
        this.conformationPage = new ConfirmationPage(page);
        this.tripHistoryPage = new TripHistoryPage(page);

    }


     /**
    * This Method will navigate to website
    */
   async openWebsite(){
    await this.searchPage.OpenWebsite();
   }


    /**
    * This method will do the login action
    */
   async login(email:string,password:string){
    await this.loginPage.login(email,password);
   }

   async openLogin(){
    await this.searchPage.clickLogin();
   }

   async getUrl(){
        await this.page.waitForLoadState('load');
        return this.page.url();
    }

    async searchFlight(from:string,to:string,date:string){
        await this.searchPage.addFrom(from);
        await this.searchPage.addTo(to);
        await this.searchPage.selectDate(date);
        await this.searchPage.clickSearch();
    }

    async clickFirstFlight(){
        await this.flightListingPage.clickFirstCard();
    }

    async selectSeatAndClickContinue(){
        await this.seatPage.clickFirstSeat();
        await this.seatPage.continueToPassenger();
    }

    async fillPassengerDetails(firstName:string,lastName:string,age:string,email:string,phoneNumber:string){
        await this.passengerPage.addFirstName(firstName);
        await this.passengerPage.addSecondName(lastName);
        await this.passengerPage.addAge(age);
        await this.passengerPage.addEmail(email);
        await this.passengerPage.addPhoneNumber(phoneNumber);
        await this.passengerPage.continueToPayment();      
    }

    async addPaymentDetails(nameOnCard:string,cardNumber:string,expiry:string,cvv:string){
        await this.paymentPage.addNameOnCard(nameOnCard);
        await this.paymentPage.addCardNumber(cardNumber);
        await this.paymentPage.addExpiry(expiry);
        await this.paymentPage.addCVV(cvv);
        await this.paymentPage.clickPay();
    }

    async conformationPageVisible(){ 
        await this.conformationPage.checkConfirmationDetailsVisible();
    }

    async gotoTripHistory(){
        await this.conformationPage.gotoTrip();
    }

    async getPNR(){
        return await this.conformationPage.getPNR();
    }

    async cancelLastTrip(){
        await this.tripHistoryPage.cancelLastTrip();
    }

    async statusofPNRpassedtrip(pnr:string){
      return  await this.tripHistoryPage.verifyTripStatus(pnr);
    }

}