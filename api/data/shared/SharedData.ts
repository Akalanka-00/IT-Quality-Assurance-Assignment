const date = new Date();

export const SharedData = {

    randomInt: date.valueOf(),
    randomStr: `API_Test_${date.valueOf()}`,

}