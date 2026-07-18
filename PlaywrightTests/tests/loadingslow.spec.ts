import { testUsers } from '../data/testUser';
import { test, expect } from '../fixture/index';
import { secrets } from '../src/utils/secrets';
import { util } from '../src/utils/util';

test.describe('Checking whether I handle the show error', () => {
  test('Loading Test', async ({ flow, log }) => {
    await flow.start();
    log.info('Home page opened');

    await flow.clickLogin();
    log.info('Navigated to login page');

    await expect(await flow.currentUrl()).toContain('/login');
    log.info('Login URL verified');

    await flow.login(util.emailName(testUsers.user.name),secrets.getuserPassword(testUsers.user.name));
    log.info('Login Credentials', {
      username: testUsers.user.name,
      password: testUsers.user.name
    });

    await flow.getToTrip();
    log.info('The Go to trip is loaded sucessfully');
    
    expect(await flow.currentUrl()).toContain('/my-trips');

  });

});
