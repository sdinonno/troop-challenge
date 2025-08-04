import { type Locator, type Page, expect } from '@playwright/test';

class FormAuthenticationPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.getByRole('button').filter({hasText: 'Login'});
    }

    async login(username?: string, password?: string) {
        if (username !== undefined) {
            await this.usernameInput.fill(username);
        }

        if (password !== undefined) {
            await this.passwordInput.fill(password);
        }
        await this.loginButton.click();
    }
}

export default FormAuthenticationPage;