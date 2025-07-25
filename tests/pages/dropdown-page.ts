import { type Locator, type Page, expect } from '@playwright/test';

class DropdownPage {
    readonly page: Page;
    readonly dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
    }

    async selectOption(label: string) {
        await this.dropdown.selectOption(label);
    }

    async selectOptionByIndex(index: number) {
        await this.dropdown.selectOption({ index: index});
    }

    async getSelectedOption() {
        return this.page.locator("option[selected=selected]").textContent();
    }
}

export default DropdownPage;