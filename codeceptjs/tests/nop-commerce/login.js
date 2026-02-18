Feature('NopCommerce Admin Login');

Scenario('Login to admin panel', async ({ I }) => {
    I.amOnPage('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');

    // Fill email field
    I.fillField('//input[@class="email"]', 'admin@yourstore.com');

    // Fill password field
    I.fillField('//input[@class="password"]', 'admin');

    // Click login button
    I.click('//button[@type="submit"]');
    pause()
    // Optional: verify login success by checking URL or element
    I.waitForURL('https://admin-demo.nopcommerce.com/admin/', 10); // waits up to 10 seconds for URL to contain /admin
    I.seeInCurrentUrl('/admin');
});
