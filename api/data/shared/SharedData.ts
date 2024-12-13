const date = new Date();

export const SharedData = {

    randomInt: date.valueOf(),
    randomStr: `UI_Test${date.valueOf()}`,
    isLoggedIn: false,

}