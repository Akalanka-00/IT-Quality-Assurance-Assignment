import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {UserLogin} from '../../src/authentication/userLogin';


setDefaultTimeout(1000*60*5);
const userLogin = new UserLogin();

// Step Definitions

Given('I navigate to the "My Account Information" page', async function (string) {

});


When('I update the firstname,lastname and email', async function () {

});

When('I click the "Continue" button', async function (string) {

});

Then('I should see a success message confirming the details were updated', async function () {

});






