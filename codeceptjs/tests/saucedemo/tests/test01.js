const loginPage = require('../pages/loginPage')

Feature('Saucedemo')
Before(async()=>{
    await loginPage.open()
})
Scenario('proper login', async() =>{
    await loginPage.m11()
    await loginPage.properLoginResult()
})
Scenario('improper login 1', async() =>{
    await loginPage.m01()
})
Scenario('improper login 2', async() =>{
    await loginPage.m10()
})
Scenario('improper login 3', async() =>{
    await loginPage.m00()
})
Scenario('empty login', async() =>{
    await loginPage.empty()
})