import { testUsers } from '../data/testUser';
import { test, expect } from '../fixture/index';
import { secrets } from '../src/utils/secrets';
import { util } from '../src/utils/util';

test.describe('Negative tests for bus booking flow', () => {
  test('Login should fail for invalid credentials', async ({ flow, log }) => {
    await flow.start();
    log.info('Home page opened');

    await flow.clickLogin();
    log.info('Navigated to login page');

    await expect(await flow.currentUrl()).toContain('/login');
    log.info('Login URL verified');

    await flow.login(util.emailName(testUsers.invalidUser.name),secrets.getuserPassword(testUsers.invalidUser.name));
    log.info('Attempted login with invalid credentials', {
      username: testUsers.invalidUser.name,
      password: testUsers.invalidUser.name
    });

    await expect(await flow.currentUrl()).toContain('/login');
    await expect(await flow.isSignInButtonVisible()).toBeTruthy();
    log.info('Invalid login rejected and sign in button remains visible');
  });

  test('Login should not proceed when password is empty', async ({ flow, log }) => {
    await flow.start();
    log.info('Home page opened for empty password test');

    await flow.clickLogin();
    log.info('Navigated to login page');

    await expect(await flow.currentUrl()).toContain('/login');
    log.info('Login URL verified');

    await flow.login('valid.user@example.com', '');
    log.info('Attempted login with empty password', {
      username: 'valid.user@example.com',
      password: ''
    });

    await expect(await flow.currentUrl()).toContain('/login');
    await expect(await flow.isSignInButtonVisible()).toBeTruthy();
    log.info('Empty password login rejected and sign in button remains visible');
  });

});
