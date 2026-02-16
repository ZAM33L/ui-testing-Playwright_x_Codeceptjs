import { test } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';
import signupData from '../data/signupData';

let signupPage;

test.describe("Parabank tests", () => {

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.openSite();
    });

    test("register an user", async () => {
        await signupPage.signupToPage();
        await signupPage.clickRegister();
        
        await signupPage.properSignUpResult(signupData.uname);
    });

});
