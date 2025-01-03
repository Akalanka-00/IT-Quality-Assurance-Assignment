import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import {UserLogin} from "../../../src/authentication/userLogin";

setDefaultTimeout(1000*60*5);
const userLogin = new UserLogin();

Given("Navigate to Login Page", async function () {
    await userLogin.verifyLoginPage();
});
When("Submit the login form with valid credentials", async function () {
    await userLogin.loginWithValidCredentials();
});
Then("User should be logged in successfully", async function () {
    await userLogin.verifySuccessfulLogin();
});
Given(/^Login with valid user credentials$/, async function () {
    await userLogin.processLogin();
});