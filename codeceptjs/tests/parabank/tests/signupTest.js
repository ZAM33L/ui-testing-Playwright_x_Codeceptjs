const signupPage = require('../pages/signupPage')
const signupData = require('../data/signupData')

Feature('Parabank')
Before(async()=>{
    await signupPage.open()
})
Scenario('proper signup', async() =>{
    await signupPage.signupToPage()
    await signupPage.clickRegister()
    await signupPage.properSignUpResult(signupData.uname);

})