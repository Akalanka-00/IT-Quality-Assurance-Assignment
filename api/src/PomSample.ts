import {APIRequestContext} from "@playwright/test";
import {RequestHandler} from "../utils/RequestHandler";
import {UserRole} from "../enum/UserRole";
import {Book} from "../model/Book";
import {DataStore} from "../utils/DataStore";

export class PomSample{

    private request:APIRequestContext;
    private requestHandler:RequestHandler;

    constructor(request:APIRequestContext){
        this.request = request;
        this.requestHandler = new RequestHandler(request);
    }
    public async testMethod(){
        const data = DataStore.getInstance().getData();
        const book:Book = {author: `${data.SharedData.randomStr}_Author`, id: data.SharedData.randomInt, title: `${data.SharedData.randomStr}_Title`}
        const res = await this.requestHandler.getRequest(UserRole.User, "/api/books");
        const postRes = await this.requestHandler.postRequest(UserRole.User, "/api/books", book);
        const res2 = await this.requestHandler.postRequest(UserRole.User, "/api/books", book);
        const getRes = await this.requestHandler.getRequest(UserRole.User, "/api/books");


       // console.log(res);
        console.log(postRes);
        console.log(res2);
        //console.log(getRes);
        console.log("Successfully tested API.")
    }
}