import { test } from '@playwright/test';
import { SigninPage } from '../pages/signinPage';
import signupData from '../data/signupData';

let signinPage;

test.describe("Parabank tests", () => {

    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.openSite()
    });

    test("login an user",async()=>{
        await signinPage.loginToPage()
        await signinPage.clickLoginBtn()
    })

});
