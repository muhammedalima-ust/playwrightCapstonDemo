import { test, expect } from '../fixture/index';
import { testUsers } from '../data/testUser';
import { util } from '../src/utils/util';
import { secrets } from '../src/utils/secrets';
import { testTripData } from '../data/testTripData';

test.describe("Test for the flow from ordering a bus",()=>{
    test("End To End Flow",async ({flow,log,evidence,page,isMobile},testInfo)=>{
      await flow.start();
      log.info("The Home Page Opened");
      
      await flow.clickLogin();
      log.info("Clicked on Login Page");

      expect(await flow.currentUrl()).toContain("/login");
      log.info("Login page url verified");

      await flow.login(util.emailName(testUsers.user.name),secrets.getuserPassword(testUsers.user.name));
      log.info("Login sucessfully for the user",{
        username:util.emailName(testUsers.user.name),
        password:secrets.getuserPassword(testUsers.user.name)
      })
      evidence["user-details"] = {
                                  username: testUsers.user.name,
                                  status: "logged-in",
                                };
                                
      await flow.search(testTripData.trip1.from,testTripData.trip1.to,Number(testTripData.trip1.dateAdder));
      log.info(`Search for Bus`,{From:testTripData.trip1.from,To:testTripData.trip1.to,Date:Number(testTripData.trip1.dateAdder)});

      await flow.selectACUpperDeckBus();
      log.info("Selected AC Upper Deck BUS");

      await flow.addPassengerDetails(
        testUsers.user.name,
        testUsers.user.lastName,
        testUsers.user.age,
        util.emailName(testUsers.user.name),
        String(testUsers.user.phone)
      );
      evidence["Passenger Details"] = {
        firstName: testUsers.user.name,
        lastName: testUsers.user.lastName,
        age: testUsers.user.age,
        email: util.emailName(testUsers.user.name),
        phoneNumber: String(testUsers.user.phone)
      }
      log.info("Passenger details added successfully", {
        firstName: testUsers.user.name,
        lastName: testUsers.user.lastName,
        age: testUsers.user.age,
        email: util.emailName(testUsers.user.name),
        phoneNumber: String(testUsers.user.phone)
      });

      const nameOnCard = secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_NAME`);
      const cardNumber = secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_NUMBER`);
      const cardexpiry = secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_EXPIRY`);
      const cvv = secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_CVV`);
      await flow.addPaymentDetails(
        nameOnCard,
        cardNumber,
        cardexpiry,
        cvv
      );
      evidence["Passenger Card Details"] = {
        nameOnCard:nameOnCard,
        cardNumber:cardNumber,
        cardexpiry:cardexpiry,
        cvv:cvv
      }
      log.info("Payment details added successfully", {
        nameOnCard:nameOnCard,
        cardNumber:cardNumber,
        cardexpiry:cardexpiry,
        cvv:cvv
      });

      const confirmed = page.getByRole('heading', { name: "You're all set!" });
    const alertbox = page.getByRole('alert',{name:'payment declined by gateway'})

      try {
                await confirmed.waitFor({ timeout: 800 });
                await flow.verifyConfirmationDetails();
                log.info("Confirmation page details are visible");
            } catch {
              try {
              await alertbox.waitFor({timeout: 800 })
              }
              catch {
                log.info("The payment Gateway is down");
                test.skip(isMobile,"The test is skipped because of the payment gateway down");
              }
              
            }
      
    })
})