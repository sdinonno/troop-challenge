import { expect, test } from '@playwright/test';
import DropdownPage from './pages/dropdown-page';
import urls from './utils/urls';

let dropdownPage: DropdownPage;
const options = ['Option 1', 'Option 2'];

test.describe('Dropdown Interaction', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${urls.dropdown}`);
        dropdownPage = new DropdownPage(page);
        await expect(page).toHaveURL(`${urls.dropdown}`);
    })

    for(const opt of options) {
        test(`Validate I can select the ${opt}`, async ({ page }) => {
            await test.step('Given I see the dropdown', async () => {
                await expect(dropdownPage.dropdown).toBeVisible();
            })
    
            await test.step(`When I select the ${opt} option`, async () => {
                await dropdownPage.selectOptionByText(opt);
            })

            await test.step(`Then I see the ${opt} selected`, async () => {
                expect(await dropdownPage.getSelectedOption()).toBe(opt);
            })
        })
    }

    test('Validate I can switch between options', async ({ page }) => {
        await test.step('Given I see the dropdown', async () => {
            await expect(dropdownPage.dropdown).toBeVisible();
        })

        await test.step('When I select the first option', async () => {
            await dropdownPage.selectOptionByText(options[0]);
        })

        await test.step('And I select the second option', async () => {
            await dropdownPage.selectOptionByText(options[1]);
        })
        
        await test.step('Then I should see the second option selected', async () => {
            await expect(dropdownPage.dropdown).toHaveValue('2');
        })
    })
})
