import { test, expect } from '@playwright/test';
import { basicUserAuthentication } from '../../utils/playwright.helpers';

test.use(basicUserAuthentication());

test.describe("tests", () => {
    test.skip('test1', async ({ page }) => {
        await page.goto('https://dev-editor.true-bar.si/');

        await page.getByPlaceholder('Uporabniško ime').click();
        await page.getByPlaceholder('Uporabniško ime').fill('essa');
        await page.getByPlaceholder('Geslo').click();
        await page.getByPlaceholder('Geslo').fill('test123');

        await page.getByRole('button', { name: 'PRIJAVA' }).click();

        const logoutButton = page.getByRole('button', { name: 'ODJAVA' });

        await page.locator('form button').first().click();

        await page.getByRole('button', { name: 'NALOŽI' }).click();

        const alertLocator = page.getByRole('alert');
        const alertText = 'Za nalaganje nimate dovoljenja.';
        await expect(alertLocator).toHaveText(alertText);

        await page.getByRole('button').nth(3).click();
        await logoutButton.click();
    });

    test('test2', async ({ page }) => {
        await page.goto('https://dev-editor.true-bar.si/');
        await page.getByPlaceholder('Uporabniško ime').click();
        await page.getByPlaceholder('Uporabniško ime').fill('essa');
        await page.getByPlaceholder('Geslo').click();
        await page.getByPlaceholder('Geslo').fill('test1234');
        await page.getByRole('button', { name: 'PRIJAVA' }).click();
        const errorLocator = page.getByText('Vneseni podatki so napačni').first();

        expect(errorLocator).not.toBeNull();
    });
});
