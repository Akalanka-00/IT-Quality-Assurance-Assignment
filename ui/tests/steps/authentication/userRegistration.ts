import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {UserRegistration} from "../../../src/authentication/registration";
import {UserLogin} from "../../../src/authentication/userLogin";

setDefaultTimeout(1000*60*10);
const userRegistration = new UserRegistration();
const userLogin = new UserLogin();

Given("Navigate to User Registration Page", async function () {
    await userRegistration.verifyRegistrationPage(true);
});
Given(/^Have valid data to register$/, function () {
    this.user = userRegistration.toBeHaveValidRegistrationInfo();
});
When("Submit the registration form", async function () {
    await userRegistration.registerAccount(this.user);
});
Then("User should be registered successfully", async function () {
    await userRegistration.verifyRegistrationSuccess();
});

Given(/^User should be logged out successfully$/, async function () {
    await userLogin.logout();
});
Given(/^Have valid data to register with email address$/, async function () {
this.user = userRegistration.toBeHaveValidRegistrationInfo("_ex");

});
Then(/^Get the existing email address error message$/, async function () {
    await userRegistration.verifyExistingEmailError();
});
When(/^Submit the registration form with the same email address$/, async function () {
    await userRegistration.registerAccount(this.user, true);

});