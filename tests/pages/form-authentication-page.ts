import { type Locator, type Page, expect } from '@playwright/test';
import urls from '../utils/urls';

class FormAuthenticationPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.getByRole('button').filter({hasText: 'Login'});
    }

    /*async goto() {
        await this.page.goto(`**${urls.formAuthentication}`);
    }*/

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

export default FormAuthenticationPage;