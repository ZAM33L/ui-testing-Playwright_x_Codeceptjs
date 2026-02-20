const assert = require('assert');

Feature('learn-automation website Tests');

const bURL = 'https://freelance-learn-automation.vercel.app/signup';

Before(({ I }) => {
  I.amOnPage(bURL);
});

Scenario('testing state dropdown', async ({ I }) => {

  const selectState = '#state';

  I.waitForElement(selectState, 10);
  I.seeElement(selectState);

  const allStates = await I.grabTextFromAll(`${selectState} option`);

  console.log("All States:");
  console.log(allStates);

  const hasRajasthan = allStates.map(s => s.trim().toLowerCase()).includes('rajasthan');

  assert.strictEqual(hasRajasthan, true, "Rajasthan should be present in the dropdown");
});