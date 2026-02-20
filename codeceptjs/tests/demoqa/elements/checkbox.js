const assert = require('assert');

Feature("DemoQa tests - TextBox");

const baseURL = "https://demoqa.com/";
const URLs = {
    "elements":"//a[@href='/elements']"
}
const elementsTypesURLs = {
    "textbox":"//a[@href='/text-box']",
    "checkbox":"//a[@href='/checkbox']",
}

const checkBoxheading = "//h1[normalize-space()='Check Box']"

const treeSwitch = (elementNearby) =>`//span[normalize-space()='${elementNearby}']/parent::*/preceding-sibling::span[contains(@class,'switch')]`;
const checkBox = (elementNearby) => `//span[contains(@class,"rc-tree-checkbox") and contains(@aria-label,"${elementNearby}")]`;
const resultSlot = "//div[@id='result']"


Before(async ({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements)
    I.click(elementsTypesURLs.checkbox)
});


Scenario('expanding all nodes', async ({ I }) => {

    I.seeInCurrentUrl('/checkbox')
    const checkBoxheading_txt = await I.grabTextFrom(checkBoxheading)
    assert.equal(checkBoxheading_txt, 'Check Box')

    I.seeElement(treeSwitch("Home"))
    I.click(treeSwitch("Home"))

    I.seeElement(checkBox("Home"))
    I.click(checkBox("Home"))  

    I.waitForElement(resultSlot, 5)

    const resultSlot_txt = await I.grabTextFrom(resultSlot)

    assert(resultSlot_txt.includes("home"))
});
