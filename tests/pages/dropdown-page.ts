import { type Locator, type Page, expect } from '@playwright/test';

class DropdownPage {
    readonly page: Page;
    readonly dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
    }

    async getDropdownOptions() {
        const optionElements = await this.dropdown.locator('option').all();
        const optionTexts = await Promise.all(optionElements.map(opt => opt.textContent()));    
        // Remove null values (in case some options are empty)
        return optionTexts.filter((text): text is string => text !== null);
    }

    async selectOptionByText(option: string) {
        const optionElement = await this.dropdown.locator('option', { hasText: option });
        const value = await optionElement.getAttribute('value');

        if (!value) {
            throw new Error(`Option with text "${option}" not found or has no value attribute`);
        }
        await this.dropdown.selectOption(value);
    }

    async selectOptionByIndex(index: number) {
        await this.dropdown.selectOption({ index: index});
    }

    async getSelectedOption() {
        const selected = await this.dropdown.locator('option[selected]').textContent();
        console.log('SELECTED:' + selected)
        return selected?.trim() || '';
    }
}

export default DropdownPage;