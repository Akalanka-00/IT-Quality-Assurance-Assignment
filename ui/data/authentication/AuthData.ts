// Import any necessary models if needed (for example, LoginCredentials model)
import { LoginCredentials } from "../../model/authentication/LoginCredentials";

// Get the current date and time to generate dynamic data
const date = new Date();

// Define common data
const commonData = {
    randomInt: date.valueOf(),
    randomStr: `UI_Test${date.valueOf()}`,
};

// Define your shared authentication data in the required format
export const AuthData = {
    credentials: { username: "Admin", password: "admin123" } as LoginCredentials,
    title: "OrangeHRM",
    logoImg: "https://opensource-demo.orangehrmlive.com/web/images/ohrm_branding.png?v=1721393199309",
    loginTitle: "Login",
    usernameFieldName: "username",
    usernameFieldPlaceHolder: "Username",
    passwordFieldName: "password",
    passwordFieldPlaceHolder: "Password",
    usernameLabel: "Username",  // You can also keep the same as `usernameFieldPlaceHolder`
    passwordLabel: "Password",  // Similarly, can be same as `passwordFieldPlaceHolder`
    loginButtonTitle: "Login",

    commonData,  // Adding commonData into AuthData for any shared, dynamic values
};

