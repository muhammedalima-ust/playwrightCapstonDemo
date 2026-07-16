import { testProduct } from '../data/testProduct';
import { test, expect } from '../fixture/index';
import { testUsers } from '../data/testUser';
import { Util } from '../src/utils/util';
import { Secrets } from '../src/utils/secrets';

test.describe("End to end flow of the app",()=>{
    test("End to end flow",async ({search,log,evidence,page},testInfo)=>{
      await search.start();
      log.info("The Home Page Opened");

      await expect(page).toHaveURL("http://localhost:8080/");
      log.info("The Home page url verified");
      
      await search.clickSignin();
      log.info("Clicked on Login Page");

      await expect(page).toHaveURL("/login");
      log.info("Login page url verified");

      await search.login(Util.emailName(testUsers.user.name),Secrets.get(`SHOPKART_${testUsers.user.name}_PASSWORD`));
      log.info("Login sucessfully for the user",{username:Util.emailName(testUsers.user.name),password:Secrets.get(`SHOPKART_${testUsers.user.name}_PASSWORD`)})
      evidence["user-details"] = {
                                  username: "alice",
                                  status: "logged-in",
                                };  
      evidence["loginnned-screenshot"] = await page.screenshot({
            path: "Report/screenshot/logged/loginpage.png",
            mask:[
                page.getByLabel('password'),
            ]}); 
      
      await search.search(testProduct.product1.name);
      log.info("Search for lamp");

      await search.validateSearch(testProduct.product1.name);
      log.info("Product shown has only lamp");

      await search.gotoFirstProductDetailPage(testProduct.product1.name)
      log.info("Go to teh product Detail page")

      await expect(page).toHaveURL(`product/${testProduct.product1.sku}`);
      log.info("Verified the Product Page is reaced using url",{url:testProduct.product1.sku});

      await search.addToCart();
      log.info("Product added to cart");

      await expect(page).toHaveURL(`cart`);
      log.info("Cart Page reached");


      await search.checkOut();
      log.info("Product added to cart");

      await expect(page).toHaveURL(`checkout`);
      log.info("checkout Page reached");

      await search.addAddress(testUsers.user.address);
      log.info("Product added to cart");

      await search.placeOrder();
      log.info("Product added to cart");

      await search.getOrderByAPI(testProduct.product1.sku);
      log.info("Product SKU is there",{SKU:testProduct.product1.sku});
    })
})