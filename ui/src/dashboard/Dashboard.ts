import {Shared} from "../shared/Shared";
import {AuthData} from "../../data/authentication/AuthData";
import {Urls} from "../../data/urls/Urls";
import {Page} from "@playwright/test";

export class Dashboard{

    private shared: Shared;
    private page:Page;

    constructor(page:Page) {
        this.shared = new Shared();
        this.page = page;
    }

    public async verifyDashboard(){
        await this.page.waitForTimeout(2000);
        await this.shared.validateUrl(this.page, Urls.DASHBOARD_URL);
    }
}