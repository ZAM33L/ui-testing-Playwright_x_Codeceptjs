const assert = require('assert');

Feature('Internet Heroku App - JS Alerts');

const bURL = 'https://the-internet.herokuapp.com/javascript_alerts';

const jsAlertBtn = "//button[text()='Click for JS Alert']";
const jsConfirmBtn = "//button[text()='Click for JS Confirm']";
const jsPromptBtn = "//button[text()='Click for JS Prompt']";

const resultBar = '#result';

const resultAlertJS = 'You successfully clicked an alert';
const resultConfirmOk = 'You clicked: Ok';
const resultConfirmCancel = 'You clicked: Cancel';

const promptText = 'Jameel';
const resultPrompt = `You entered: ${promptText}`;

Before(({ I }) => {
    I.amOnPage(bURL);
});

// -------------------------
// JS Alert
Scenario('JS Alert', async ({ I }) => {
    I.click(jsAlertBtn);
    I.acceptPopup(); // Accept alert
    const resultTxt = await I.grabTextFrom(resultBar);
    assert.strictEqual(resultTxt, resultAlertJS);
});

// -------------------------
// JS Confirm - Accept
Scenario('JS Confirm - Accept', async ({ I }) => {
    I.click(jsConfirmBtn);
    I.acceptPopup(); // Accept confirm
    const resultTxt = await I.grabTextFrom(resultBar);
    assert.strictEqual(resultTxt, resultConfirmOk);
});

// -------------------------
// JS Confirm - Dismiss (override)
Scenario('JS Confirm - Dismiss', async ({ I }) => {
    // Override window.confirm to simulate Cancel
    I.executeScript(() => { window.confirm = () => false; });
    I.click(jsConfirmBtn);
    const resultTxt = await I.grabTextFrom(resultBar);
    assert.strictEqual(resultTxt, resultConfirmCancel);
});

// -------------------------
// JS Prompt
Scenario('JS Prompt', async ({ I }) => {
    I.executeScript((text) => {
        window.prompt = () => text;
    }, promptText);

    I.click(jsPromptBtn);

    const resultTxt = await I.grabTextFrom(resultBar);
    assert.strictEqual(resultTxt, resultPrompt);
});