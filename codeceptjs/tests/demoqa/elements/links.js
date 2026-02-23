const assert = require('assert');

Feature("DemoQa tests - Links");

const baseURL = "https://demoqa.com/";

const URLs = {
    elements: "//a[@href='/elements']"
}

const elementsTypesURLs = {
    radio_button: "//a[@href='/radio-button']",
    textbox: "//a[@href='/text-box']",
    checkbox: "//a[@href='/checkbox']",
    buttons: "//a[@href='/buttons']",
    links: "//a[@href='/links']",

}

const heading = "//h1[normalize-space()='Links']";

const simpleLink = "#simpleLink";
const dynamicLink = "#dynamicLink";

const createdLink = "#created";
const noContentLink = "#no-content";
const movedLink = "#moved";
const badRequestLink = "#bad-request";
const unauthorizedLink = "#unauthorized";
const forbiddenLink = "#forbidden";
const invalidUrlLink = "#invalid-url";

const responseMsg = "#linkResponse";

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements);
    I.click(elementsTypesURLs.links);
});

Scenario('successful page load', ({ I }) => {
    I.seeInCurrentUrl('/links');
    I.see('Links', 'h1');
});

Scenario('click simple link (new tab)', ({ I }) => {
    I.seeElement(simpleLink)
    I.click(simpleLink)
    I.switchToNextTab()
    I.seeInCurrentUrl('demoqa.com')
    I.closeCurrentTab()
});

Scenario('click dynamic link (new tab)', ({ I }) => {
    I.seeElement(dynamicLink)
    I.click(dynamicLink)
    I.switchToNextTab()
    I.seeInCurrentUrl('demoqa.com')
    I.closeCurrentTab()
});

Scenario('click created link', ({ I }) => {
    I.seeElement(createdLink)
    I.click(createdLink)
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 201 and status text Created', responseMsg);
});

Scenario('click no-content link', ({ I }) => {
    I.seeElement(noContentLink);
    I.click(noContentLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 204 and status text No Content', responseMsg);
});

Scenario('click moved link', ({ I }) => {
    I.seeElement(movedLink);
    I.click(movedLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 301 and status text Moved Permanently', responseMsg);
});

Scenario('click bad-request link', ({ I }) => {
    I.seeElement(badRequestLink);
    I.click(badRequestLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 400 and status text Bad Request', responseMsg);
});

Scenario('click unauthorized link', ({ I }) => {
    I.seeElement(unauthorizedLink);
    I.click(unauthorizedLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 401 and status text Unauthorized', responseMsg);
});

Scenario('click forbidden link', ({ I }) => {
    I.seeElement(forbiddenLink);
    I.click(forbiddenLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 403 and status text Forbidden', responseMsg);
});

Scenario('click invalid-url link', ({ I }) => {
    I.seeElement(invalidUrlLink);
    I.click(invalidUrlLink);
    I.waitForElement(responseMsg, 5);
    I.see('Link has responded with staus 404 and status text Not Found', responseMsg);
});




