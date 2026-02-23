const assert = require('assert');

Feature("DemoQa tests - Web Tables");

const baseURL = "https://demoqa.com/";

const URLs = {
    elements: "//a[@href='/elements']"
}

const elementsTypesURLs = {
    radio_button: "//a[@href='/radio-button']",
    textbox: "//a[@href='/text-box']",
    checkbox: "//a[@href='/checkbox']",
    webTables: "//a[@href='/webtables']"
}

const webTablesHeading = "//h1[normalize-space()='Web Tables']"

const addBtn = "#addNewRecordButton"
const modal = "//div[@class='modal-content']"

const firstName = "#firstName"
const lastName = "#lastName"
const userEmail = "#userEmail"
const age = "#age"
const salary = "#salary"
const department = "#department"
const submitBtn = "#submit"

const searchBox = "#searchBox"

const editBtn = (searchTerm) => `//div//td[text()="${searchTerm}"]/..//span[@title='Edit']`
const deleteBtn = (searchTerm) => `//div//td[text()="${searchTerm}"]/..//span[@title='Delete']`

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click(URLs.elements);
    I.click(elementsTypesURLs.webTables);
});

Scenario('successful page load', async ({ I }) => {
    I.seeInCurrentUrl('/webtables');
    const headingText = await I.grabTextFrom(webTablesHeading);
    assert.equal(headingText, 'Web Tables');
});

Scenario('visible records', async ({ I }) => {
    I.see('Kierra');
    I.see('Alden');
    I.see('Cierra');
});

Scenario('add new record test', async ({ I }) => {
    I.click(addBtn)
    I.seeElement(modal)

    I.fillField(firstName, 'Jameel');
    I.fillField(lastName, 'Asfer');
    I.fillField(userEmail, 'jam@gmail.com');
    I.fillField(age, '22');
    I.fillField(salary, '10000');
    I.fillField(department, 'IT');

    I.click(submitBtn)

    I.see("Jameel")
});

Scenario('search records', async ({ I }) => {
    const expected = [
        "Kierra", "Gentry", "29",
        "kierra@example.com", "2000", "Legal"
    ];

    for (const value of expected) {
        I.see(value)
    }
});

Scenario('edit a record by search', async ({ I }) => {
    const searchTerm = 'Kierra'

    I.fillField(searchBox, searchTerm)
    I.see(searchTerm)

    I.click(editBtn(searchTerm))
    I.fillField(age, '35');
    I.fillField(department, 'HR');

    I.click(submitBtn);

    const updated = ["Kierra", "Gentry", "35", "HR"];

    for (const value of updated) {
        I.see(value);
    }

});

Scenario('edit a record by row index', ({ I }) => {

    const rowIndex = 1;

    I.click(`(//span[@title='Edit'])[${rowIndex}]`);

    I.fillField(firstName, 'Lena');
    I.fillField(lastName, 'tamil');
    I.fillField(userEmail, 'lena@gmail.com');
    I.fillField(age, '22');
    I.fillField(salary, '10000');
    I.fillField(department, 'Finance');

    I.click(submitBtn);

    const updated = ["Lena", "tamil", "Finance"];

    for (const value of updated) {
        I.see(value);
    }
});

Scenario('delete a record by search option', async ({ I }) => {
    const searchTerm = "Kierra";

    I.fillField(searchBox, searchTerm);
    I.see(searchTerm);

    I.click(deleteBtn(searchTerm))

    I.dontSee(searchTerm)
});

Scenario('delete a record by index', async ({ I }) => {

    const rowIndex = 1;
    const rowTextBefore = await I.grabTextFrom(`(//table//tbody//tr)[${rowIndex}]`);
    I.click(`(//table//tbody//tr)[${rowIndex}]//span[@title='Delete']`);
    const tableTextAfter = await I.grabTextFrom("//table//tbody");
    assert(!tableTextAfter.includes(rowTextBefore));

});

