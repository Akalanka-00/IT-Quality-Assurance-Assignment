const date = new Date();

const commonData = {

    randomInt: date.valueOf(),
    randomStr: `UI_Test_${date.valueOf()}`,
    isLoggedIn: false,
    logoUrl: "https://demo.opencart.com/image/catalog/opencart-logo.png"

}

export const SharedData = {

    ...commonData,

}