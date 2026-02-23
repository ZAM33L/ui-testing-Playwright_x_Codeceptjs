const assert = require('assert');

Feature('DemoQa tests - Broken Links & Images');

const baseURL = "https://demoqa.com/";

const URLs = {
    elements: "//a[@href='/elements']",
    broken: "//a[@href='/broken']"
};

const validImage = "(//img[@src='/images/Toolsqa.jpg'])[2]";
const brokenImage = "(//img[contains(@src,'Toolsqa_1.jpg')])[1]";

const validLink = "//a[text()='Click Here for Valid Link']";
const brokenLink = "//a[text()='Click Here for Broken Link']";

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements);
    I.click(URLs.broken);
});

Scenario('page load', ({ I }) => {
    I.seeInCurrentUrl('/broken');
    I.see('Broken Links - Images', 'h1');
});

Scenario('valid image is visible', async ({ I }) => {
    I.seeElement(validImage);

    const naturalWidth = await I.executeScript((locator) => {
        const img = document.evaluate(
            locator,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        return img ? img.naturalWidth : 0;
    }, validImage);

    assert(naturalWidth > 0);
});

Scenario('broken image is not loaded', async ({ I }) => {
    I.seeElement(brokenImage);

    const naturalWidth = await I.executeScript((locator) => {
        const img = document.evaluate(
            locator,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        return img ? img.naturalWidth : 0;
    }, brokenImage);

    assert.strictEqual(naturalWidth, 0);
});

Scenario('valid link navigates correctly', ({ I }) => {
    I.click(validLink);
    I.seeInCurrentUrl('demoqa.com');
});

Scenario('broken link returns 500 error', async ({ I }) => {
    I.click(brokenLink);

    const response = await I.sendGetRequest(
        'http://the-internet.herokuapp.com/status_codes/500'
    );

    assert.strictEqual(response.status, 500);
});