const date = new Date();

const commonData = {

    randomInt: date.valueOf(),
    randomStr: `UI_Test${date.valueOf()}`,
    isLoggedIn: false,

}

export const SharedData = {

    ...commonData,

}