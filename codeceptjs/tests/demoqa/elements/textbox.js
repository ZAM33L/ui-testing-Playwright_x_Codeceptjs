const assert = require('assert');

Feature("DemoQa tests - TextBox");

const baseURL = "https://demoqa.com/";
const URLs = {
    "elements":"//a[@href='/elements']"
}
const elementsTypesURLs = {
    "textbox":"//a[@href='/text-box']",
}

Before(async ({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements)
    I.click(elementsTypesURLs.textbox)
});

const textBoxheading = "//h1[normalize-space()='Text Box']"
const uNameBox = "//input[@id='userName']"
const uEmailBox = "//input[@id='userEmail']"
const currentAddressBox = "//textarea[@id='currentAddress']";
const permanentAddressBox = "//textarea[@id='permanentAddress']"
const submitBtn = "//button[@id='submit']"

const uName = "Jameel"
const uEmail = "jam@gmail.com"
const currentAddress = "#7 , Main Street";
const permanentAddress = "#78 , Ham Street"

const r_uName = "//p[@id='name']"
const r_uEmail = "//p[@id='email']"
const r_currentAddress = "//p[@id='currentAddress']";
const r_permanentAddress = "//p[@id='permanentAddress']"



Scenario('valid inputs', async ({ I }) => {

    I.seeInCurrentUrl('/text-box')
    const textBoxheading_txt = await I.grabTextFrom(textBoxheading)
    assert.equal(textBoxheading_txt, 'Text Box')

    I.fillField(uNameBox, uName)
    I.fillField(uEmailBox, uEmail)
    I.fillField(currentAddressBox, currentAddress)
    I.fillField(permanentAddressBox, permanentAddress)
    I.click(submitBtn)

    I.waitForElement(r_uName, 5)

    const resultName = await I.grabTextFrom(r_uName)
    const resultEmail = await I.grabTextFrom(r_uEmail)
    const resultCurrent = await I.grabTextFrom(r_currentAddress)
    const resultPermanent = await I.grabTextFrom(r_permanentAddress)

    assert(resultName.includes(uName))
    assert(resultEmail.includes(uEmail))
    assert(resultCurrent.includes(currentAddress))
    assert(resultPermanent.includes(permanentAddress))
});


Scenario('invalid email shows error', async ({ I }) => {
    I.fillField(uEmailBox, 'invalid-email')
    I.click(submitBtn)
    I.seeElement('#userEmail.field-error')
});