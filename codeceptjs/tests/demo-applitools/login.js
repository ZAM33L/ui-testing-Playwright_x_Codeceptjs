Feature('Demo Applitools')

Scenario('Login',async({I})=>{
    I.amOnPage('https://demo.applitools.com/');
    I.fillField("//input[@placeholder='Enter your username']", "Admin");
    I.fillField("//input[@placeholder='Enter your password']", "admin123");
    I.click("//a[text()='Sign in']");
    I.waitForURL('**/app.html', 10)
    I.seeInCurrentUrl('/app.html')
})