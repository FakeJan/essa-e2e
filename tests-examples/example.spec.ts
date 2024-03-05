import { test, expect } from '@playwright/test';
import { link } from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  const linkLocator = page.getByRole('link', { name: 'Get started' });
  await linkLocator.click();

  // Expects page to have a heading with the name of Installation.
  const headingRole = page.getByRole('heading', { name: 'Installation' });
  await expect(headingRole).toBeVisible();
});
