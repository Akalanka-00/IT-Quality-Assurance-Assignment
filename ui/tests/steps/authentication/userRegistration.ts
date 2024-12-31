import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {UserRegistration} from "../../../src/authentication/registration";

setDefaultTimeout(1000*60*10);
const userRegistration = new UserRegistration();

Given("Navigate to User Registration Page", async function () {
    await userRegistration.verifyRegistrationPage();
});
When("Submit the registration form with valid data", async function () {
    await userRegistration.registerAccount();
});
Then("User should be registered successfully", async function () {
    await userRegistration.verifyRegistrationSuccess();
});