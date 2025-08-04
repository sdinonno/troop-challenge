import { expect, test } from '@playwright/test';
import FormAuthenticationPage from './pages/form-authentication-page';
import urls from './utils/urls';
import credentials from './data/credentials';

let formAuthenticationPage: FormAuthenticationPage;

test.describe('Form Authentication', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${urls.formAuthentication}`);
        formAuthenticationPage = new FormAuthenticationPage(page);
        await expect(page).toHaveURL(`${urls.formAuthentication}`);
    })

    test('Validate authentication with valid credentials', async ({ page }) => {

        await test.step('Given I can see the fields on the login page', async () => {
            await expect(formAuthenticationPage.usernameInput).toBeVisible();
            await expect(formAuthenticationPage.passwordInput).toBeVisible();
        });

        await test.step('When I perform login with valid credentials', async () => {
            await formAuthenticationPage.login(credentials.valid.username, credentials.valid.password);
        });

        await test.step('Then I am logged in', async () => {
            await expect(page).toHaveURL(`${urls.secure}`);
            await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        })
    })

    for(const {username, password, error} of credentials.invalid) {
        const field = error.includes("username") ? "username" : "password";

        test(`Validate authentication with "${error}"`, async ({ page }) => {

            await test.step('Given I can see the fields on the login page', async () => {
                await expect(formAuthenticationPage.usernameInput).toBeVisible();
                await expect(formAuthenticationPage.passwordInput).toBeVisible();
            });
            
            await test.step(`When I enter "${username}" as username and ${password} as password`, async () => {
                await formAuthenticationPage.login(username, password);
            })
    
            await test.step('Then I am not logged in', async () => {
                await expect(page).toHaveURL(`${urls.formAuthentication}`);
                await expect(page.locator('#flash')).toContainText(`Your ${field} is invalid!`);
            })
        })
    }
})