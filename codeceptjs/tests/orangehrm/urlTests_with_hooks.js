const assert = require('assert');

Feature("social media links test");

const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const smLinks = [
    { name: 'LinkedIn', selector: '//a[contains(@href, "linkedin.com")]', expectedUrl: 'https://www.linkedin.com/company/orangehrm/mycompany/' },
    { name: 'Facebook', selector: '//a[contains(@href, "facebook.com")]', expectedUrl: 'https://www.facebook.com/OrangeHRM/' },
    // { name: 'Twitter', selector: '//a[contains(@href, "twitter.com")]', expectedUrl: 'https://twitter.com/orangehrm?lang=en' },
    { name: 'YouTube', selector: '//a[contains(@href, "youtube.com")]', expectedUrl: 'https://www.youtube.com/c/OrangeHRMInc' },
];

Before(async ({ I }) => {
    I.amOnPage(baseURL);
});

Scenario('logo visibility', async ({ I }) => {
    for (const link of smLinks) {
        I.waitForElement(link.selector, 10);
        I.seeElement(link.selector);

        const href = await I.grabAttributeFrom(link.selector, 'href');
        assert.strictEqual(href, link.expectedUrl);
    }
});

Scenario('clicking links', async ({ I }) => {
    for (const link of smLinks) {
        I.click(link.selector);

        I.switchToNextTab();

        I.wait(5); 

        const currentUrl = await I.grabCurrentUrl();
        assert.ok(currentUrl.includes(new URL(link.expectedUrl).hostname));

        const title = await I.grabTitle();
        assert.match(title, /OrangeHRM|LinkedIn|Facebook|YouTube/i);

        I.closeCurrentTab();
    }
});
