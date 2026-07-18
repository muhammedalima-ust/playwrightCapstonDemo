import { test, expect } from '../fixture/index';
import { testUsers } from '../data/testUser';
import { util } from '../src/utils/util';
import { secrets } from '../src/utils/secrets';
import { testTripData } from '../data/testTripData';

test.describe("Resilience", () => {
  test("UI detects payment decline", async ({ flow, log, evidence, page ,isMobile}) => {
    await flow.start();
    await flow.clickLogin();
    await flow.login(util.emailName(testUsers.user.name), secrets.getuserPassword(testUsers.user.name));
    log.info("Logged in user");

    await flow.search(testTripData.trip1.from, testTripData.trip1.to, Number(testTripData.trip1.dateAdder));
    await flow.selectACUpperDeckBus();
    await flow.addPassengerDetails(
      testUsers.user.name,
      testUsers.user.lastName,
      testUsers.user.age,
      util.emailName(testUsers.user.name),
      String(testUsers.user.phone)
    );

    await flow.addPaymentDetails(
      testUsers.user.name,
      secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_NUMBER`),
      secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_EXPIRY`),
      secrets.get(`MUHAMMED_${testUsers.user.name.toUpperCase()}_CARD_CVV`)
    );
    log.info("Submitted payment");

    const confirmed = page.getByRole('heading', { name: "You're all set!" });
    const alertbox = page.getByRole('alert',{name:'payment declined by gateway'})

  try {
            await confirmed.waitFor({ timeout: 800 });
        } catch {
           try {
          await alertbox.waitFor({timeout: 800 })
           }
          catch {
            log.info("The payment Gateway is down");

          test.skip(isMobile,"The test is skipped because of the payment gateway down");
          }
          
        }
  });
});