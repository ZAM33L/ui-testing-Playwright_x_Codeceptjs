const assert = require('assert');

Feature('internet herokuapp Tests');

const bURL = 'https://the-internet.herokuapp.com/upload';

Before(({ I }) => {
    I.amOnPage(bURL);
});

Scenario('testing upload', async ({ I }) => {
    const chooseFileBtn = '#file-upload';
    const uploadFileBtn = '#file-submit';

    I.attachFile(chooseFileBtn, 'images/mrRobot.jpg');

    I.click(uploadFileBtn);

    const resultantText = await I.grabTextFrom('//h3');

    assert.strictEqual(resultantText, "File Uploaded!");
});