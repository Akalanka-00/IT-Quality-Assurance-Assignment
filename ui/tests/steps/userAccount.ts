import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {UserAccount} from "../../src/userAccount";
import {DataStore} from "../../utils/dataStore";


setDefaultTimeout(1000*60*5);
const userAccount = new UserAccount();

// Step Definitions

Given('I navigate to the "My Account Information" page', async function () {
    await userAccount.navigateToMyAccountInfoPage();
});


When('I update the firstname,lastname and email', async function () {
    const data = DataStore.getInstance().getData();
    const userEditInfo = {
        firstName:  `John_${data.SharedData.randomInt}`,
        lastName:`Doe_${data.SharedData.randomInt}`,
        email:`JohnDoe_${data.SharedData.randomInt}@gmail.com`
    };
    await userAccount.editInfo(userEditInfo);
});

When('I click the "Continue" button', async function () {
    await userAccount.SubmitInformation();
});

Then('I should see a success message confirming the details were updated', async function () {
    await userAccount.getSuccessMessage();
    console.log("Successfully Updated");
});

// Scenario 2: Validation errors when fields are left empty or invalid
When("I leave the firstname, lastname, and email fields empty", async function () {
    const userEditInfo = {
        firstName: "",
        lastName: "",
        email: "",
    };
    await userAccount.editInfo(userEditInfo);
});

Then("I should see the validation errors", async function () {
    await userAccount.validateErrors();

});

