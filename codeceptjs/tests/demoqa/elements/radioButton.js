const assert = require('assert');

Feature("DemoQa tests - radio button");

const baseURL = "https://demoqa.com/";

const URLs = {
    elements: "//a[@href='/elements']"
}

const elementsTypesURLs = {
    radio_button: "//a[@href='/radio-button']",
}

const radioBtnheading = "//h1[normalize-space()='Radio Button']"

const yes_Btn = '(//div[contains(text(),"Do you like the site?")]/following-sibling::div//input)[1]'
const impressive_Btn = '(//div[contains(text(),"Do you like the site?")]/following-sibling::div//input)[2]'
const no_Btn = '(//div[contains(text(),"Do you like the site?")]/following-sibling::div//input)[3]'

const resultSlot = "//span[@class='text-success']"

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements);
    I.click(elementsTypesURLs.radio_button);
});

Scenario('testing btns', async ({ I }) => {

    I.seeInCurrentUrl('/radio-button');

    const headingText = await I.grabTextFrom(radioBtnheading);
    assert.equal(headingText, 'Radio Button');

    I.click(yes_Btn);
    let resultText = await I.grabTextFrom(resultSlot);
    assert(resultText.includes("Yes"));

    I.click(impressive_Btn);
    resultText = await I.grabTextFrom(resultSlot);
    assert(resultText.includes("Impressive"));

    I.seeElement(no_Btn);
    const isDisabled = await I.grabAttributeFrom(no_Btn, 'disabled');
    assert(isDisabled !== null, "No radio button should be disabled");
});