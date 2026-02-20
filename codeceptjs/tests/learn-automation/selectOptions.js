Feature('Signup Hobbies Dropdown');

Scenario('testing hobbies dropdown', async ({ I }) => {

  I.amOnPage('https://freelance-learn-automation.vercel.app/signup');

  I.selectOption('#hobbies', ['Playing', 'Swimming']);

  I.wait(3); 

});