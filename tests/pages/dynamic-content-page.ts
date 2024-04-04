import { type Locator, type Page, expect } from '@playwright/test';

class DynamicContentPage {
    readonly page: Page;
    readonly clickHereLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickHereLink = page.getByRole('link', { name: 'click here'});
    }

    async clickLink() {
        await this.clickHereLink.click();
    }

    async getImagesSource() {
        return await this.page.$$eval('#content img', elements => elements.map(element => element.getAttribute("src")));;
    }

    async getParagraphs() {
        return await this.page.$$eval('#content.large-centered .large-10', elements => elements.map(element => element.textContent));
    }

}

export default DynamicContentPage;