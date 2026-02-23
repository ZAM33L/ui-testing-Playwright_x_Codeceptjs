Feature('DemoQa tests - Buttons');

const baseURL = "https://demoqa.com/";

const URLs = {
    elements: "//a[@href='/elements']"
}

const elementsTypesURLs = {
    radio_button: "//a[@href='/radio-button']",
    textbox: "//a[@href='/text-box']",
    checkbox: "//a[@href='/checkbox']",
    webTables: "//a[@href='/webtables']",
    buttons: "//a[@href='/buttons']"
}

const heading = "//h1[normalize-space()='Buttons']";

const doubleClickBtn = "#doubleClickBtn";
const rightClickBtn = "#rightClickBtn";
const dynamicClickBtn = "//button[text()='Click Me']";

const doubleClickMsg = "#doubleClickMessage";
const rightClickMsg = "#rightClickMessage";
const dynamicClickMsg = "#dynamicClickMessage";

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements);
    I.click(elementsTypesURLs.buttons);
});

Scenario('successful page load', ({ I }) => {
    I.seeInCurrentUrl('/buttons');
    I.see('Buttons', 'h1');
});

Scenario('visibility of buttons', ({ I }) => {
    I.seeElement(doubleClickBtn);
    I.seeElement(rightClickBtn);
    I.seeElement(dynamicClickBtn);
});

Scenario('double click button test', ({ I }) => {
    I.doubleClick(doubleClickBtn);
    I.see('You have done a double click', doubleClickMsg);
});

Scenario('right click button test', ({ I }) => {
    I.rightClick(rightClickBtn);
    I.see('You have done a right click', rightClickMsg);
});

Scenario('single click button test', ({ I }) => {
    I.click(dynamicClickBtn);
    I.see('You have done a dynamic click', dynamicClickMsg);
});