import { APIRequestContext, expect, Page,TestInfo } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { CheckOutPage } from "../pages/CheckOutPage";
import { add } from "winston";
import { ProductClient } from "../api/ProductClient";

export class SearchFlow{
    private readonly homePage:HomePage;
    private readonly loginPage:LoginPage;
    private readonly cartPage:CartPage;
    private readonly productPage:ProductDetailPage;
    private readonly productClient:ProductClient;
    
    private readonly checkOutPage:CheckOutPage;
    constructor(private readonly page:Page,private readonly request:APIRequestContext,private readonly testInfo:TestInfo){
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.cartPage = new CartPage(page);
        this.productPage=new ProductDetailPage(page);
        this.checkOutPage=new CheckOutPage(page);
        this.productClient=new ProductClient(request);
    }

    async start(){
        this.homePage.open();
    }

    async clickSignin(){
       await this.homePage.clickSignIn();
    }

    async login(email:string,password:string){
        await this.loginPage.login(email,password);

        

        await this.testInfo.attach('screenshots', {
        body:  await this.page.screenshot({
            path: "Report/screenshot/loginpage.png",
            mask:[
                this.page.getByLabel('password'),
            ]
        }) ,
        contentType: 'image/png',
        }
            
        )

    }

    async search(search:string){
        await this.homePage.search(search);
    }

    async validateSearch(search:string){
        const productName : string[] = await this.homePage.productCardsSKU();

        for (const name of productName) {
            expect(name.toLowerCase()).toContain(search.toLowerCase());
        }

    }

    async gotoFirstProductDetailPage(search:string){
        await this.homePage.gotToProductDetailPage(search);
    }

    async addToCart(){
        await this.productPage.addtoCart();
    }

    async checkOut(){
        await this.cartPage.checkout();
    }
    async addAddress(address:string){
        await this.checkOutPage.addAddress(address);
    }
    async placeOrder(){
        await this.checkOutPage.placeOrder();
    }

    async getOrderByAPI(SKU:string){
       const product = await this.productClient.getProducts(SKU);
       const body = await product.json();
       expect(body[0].sku).toBe(SKU);
       expect(product.status()).toBe(200);
    }
}