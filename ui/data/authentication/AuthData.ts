

// Define your shared authentication data in the required format
export const AuthData = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    isUserCreated: false,
    isLoggedIn: false,
    registration:{
        title: "Register Account",
        placeholders:{
            firstName: "First Name",
            lastName: "Last Name",
            email: "E-Mail",
            password: "Password",
        },
        successMessage: "Your Account Has Been Created!",
        successContent:[
            "Congratulations! Your new account has been successfully created!",
            "You can now take advantage of member privileges to enhance your online shopping experience with us.",
            "If you have ANY questions about the operation of this online shop, please e-mail the store owner.",
            "A confirmation has been sent to the provided e-mail address. If you have not received it within the hour, please contact us."
        ]
    },
    logout:{
        title: "Account Logout",
        logoutMessage: "Account Logout",
        logoutContent:[
            "You have been logged off your account. It is now safe to leave the computer.",
            "Your shopping cart has been saved, the items inside it will be restored whenever you log back into your account."
        ]
    }

};

