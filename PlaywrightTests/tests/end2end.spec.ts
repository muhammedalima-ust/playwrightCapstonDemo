import { testProduct } from '../data/testProduct';
import { test, expect } from '../fixture/index';
import { testUsers } from '../data/testUser';

test.describe("End to end flow of the app",()=>{
    test("End to end flow",async ({search,log,evidence,util},testInfo)=>{
      await search.start();
      log.info("The Home Page Opened");

      await util.checkUrl("http://localhost:8080/");
      log.info("The Home page url verified");
      
      await search.clickSignin();
      log.info("Clicked on Login Page");

      await util.checkUrl("/login");
      log.info("Login page url verified");

      await search.login(testUsers.user.email,testUsers.user.password);
      log.info("Login sucessfully for the user",{username:testUsers.user.email,password:testUsers.user.password})
      evidence.userName = testUsers.user.email;
      evidence.password = testUsers.user.password;
      
      await search.search(testProduct.product1.name);
      log.info("Search for lamp");

      await search.validateSearch(testProduct.product1.name);
      log.info("Product shown has only lamp");

      await search.gotoFirstProductDetailPage(testProduct.product1.name)
      log.info("Go to teh product Detail page")

      await util.checkUrl(`product/${testProduct.product1.sku}`);
      log.info("Verified the Product Page is reaced using url",{url:testProduct.product1.sku});

      await search.addToCart();
      log.info("Product added to cart");

      await util.checkUrl(`cart`);
      log.info("Cart Page reached");


      await search.checkOut();
      log.info("Product added to cart");

      await util.checkUrl(`checkout`);
      log.info("checkout Page reached");

      await search.addAddress(testUsers.user.assress);
      log.info("Product added to cart");

      await search.placeOrder();
      log.info("Product added to cart");

      await search.getOrderByAPI(testProduct.product1.sku);
      log.info("Product SKU is there",{SKU:testProduct.product1.sku});
    })
})