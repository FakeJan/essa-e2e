import * as dotenv from 'dotenv';
import { test, expect } from '@playwright/test';

dotenv.config();

// file for storing credentials
const authFile = 'playwright/.auth/basic-user.json';

test('Basic user authentication', async ({ page }) => {
    await page.goto(process.env.TRUEBAR_URL as string);

    await page.enterUsername(process.env.TRUEBAR_BASIC_USERNAME as string);

    await page.enterPassword(process.env.TRUEBAR_BASIC_PASSWORD as string);

    await page.successfulLoginCheck();

    // store credentials for further use
    await page.context().storageState({ path: authFile });
});

