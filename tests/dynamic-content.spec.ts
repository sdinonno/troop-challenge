import { expect, test } from '@playwright/test';
import DynamicContentPage from './pages/dynamic-content-page';
import urls from './utils/urls';

let dynamicContentPage: DynamicContentPage;
const params: string = '?with_content=static';

test.beforeEach(async ({ page }) => {
    await page.goto(`${urls.dynamicContent}`);
    dynamicContentPage = new DynamicContentPage(page);
    await expect(page).toHaveURL(`${urls.dynamicContent}`);
})

test.describe('Dynamic Content Handling', () => {
    test('Validate that the content change after a reload', async ({ page }) => {
        let firstImages;
        let firstParagraphs;

        await test.step('Given I see the content', async () => {
            await expect(dynamicContentPage.getImagesSource()).not.toBeNull();

            firstImages = await dynamicContentPage.getImagesSource();
            firstParagraphs = await dynamicContentPage.getParagraphs();
        })
        
        await test.step('When I reload the page', async () => {
            await dynamicContentPage.page.reload();
        })
        
        await test.step('Then I see new content', async () => {
            let newImages  = await dynamicContentPage.getImagesSource();
            let newParagraphs = await dynamicContentPage.getParagraphs();
            
            await expect.soft(newParagraphs, 'should be different').not.toEqual(firstParagraphs);
            await expect.soft(newImages, 'should be different').not.toEqual(firstImages);
        })
        
    })

    test('Validate that some content become static using the link', async ({ page }) => {
        let firstImages;
        let firstParagraphs;
        await test.step('Given I see the content', async () => {
            await expect(dynamicContentPage.getImagesSource()).not.toBeNull();
        })
        
        await test.step('And I click the link for the first time', async () => {
            await dynamicContentPage.clickLink();
            firstImages = await dynamicContentPage.getImagesSource();
            firstParagraphs = await dynamicContentPage.getParagraphs();
        })
        
        await test.step('When I click the link for the second time', async () => {
            await dynamicContentPage.clickLink();
        })

        await test.step('Then I see that some content does not change', async () => {
            let newImages  = await dynamicContentPage.getImagesSource();
            let newParagraphs = await dynamicContentPage.getParagraphs();
            
            for (let i = 0; i < newParagraphs.length-1; i++) {
                await expect.soft(newParagraphs[i], 'should be equal').toEqual(firstParagraphs[i]);
                await expect.soft(newImages[i], 'should be equal').toEqual(firstImages[i])
            }
        })
    })

    test(`Validate that some content become static append the params ${params}`, async ({ page }) => {
        let firstImages;
        let firstParagraphs;
        await test.step(`Given I navigate to the url with the parameters "${params}"`, async () => {
            await dynamicContentPage.page.goto(`${urls.dynamicContent}${params}`);
            firstImages = await dynamicContentPage.getImagesSource();
            firstParagraphs = await dynamicContentPage.getParagraphs();
        })
        
        await test.step('When I reload the page', async () => {
            await dynamicContentPage.page.reload();
        })

        await test.step('Then I see that some content does not change', async () => {
            let newImages  = await dynamicContentPage.getImagesSource();
            let newParagraphs = await dynamicContentPage.getParagraphs();
            
            for (let i = 0; i < newParagraphs.length-1; i++) {
                await expect.soft(newParagraphs[i], 'should be equal').toEqual(firstParagraphs[i]);
                await expect.soft(newImages[i], 'should be equal').toEqual(firstImages[i])
            }
        })
    })
})
