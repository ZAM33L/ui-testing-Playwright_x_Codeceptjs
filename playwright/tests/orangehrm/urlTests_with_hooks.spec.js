const { test, expect } = require('@playwright/test');

test.describe('Social Media Links Tests with browser fixture', () => {
  const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  const socialMediaLinks = [
    { name: 'LinkedIn', selector: 'a[href="https://www.linkedin.com/company/orangehrm/"]', expectedUrl: 'https://www.linkedin.com/company/orangehrm/' },
    { name: 'Facebook', selector: 'a[href="https://www.facebook.com/OrangeHRM/"]', expectedUrl: 'https://www.facebook.com/OrangeHRM/' },
    // { name: 'Twitter', selector: 'a[href="https://twitter.com/orangehrm/"]', expectedUrl: 'https://twitter.com/orangehrm/' },
    { name: 'YouTube', selector: 'a[href="https://www.youtube.com/c/orangehrm/"]', expectedUrl: 'https://www.youtube.com/c/orangehrm/' },
  ];

  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(baseURL);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('All social media logos are visible', async () => {
    for (const link of socialMediaLinks) {
      await expect(page.locator(link.selector)).toBeVisible();
    }
  });

  test('Social media links have correct URLs', async () => {
    for (const link of socialMediaLinks) {
      const href = await page.locator(link.selector).getAttribute('href');
      expect(href).toBe(link.expectedUrl);
    }
  });

  test('Clicking social media logos opens correct pages in new tabs', async () => {
    for (const link of socialMediaLinks) {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click(link.selector),
      ]);
      await newPage.waitForLoadState('domcontentloaded');
      expect(newPage.url()).toContain(link.expectedUrl);
      await expect(newPage).toHaveTitle(/OrangeHRM|LinkedIn|Facebook|Twitter|YouTube/i);
      await newPage.close();
    }
  });
});
