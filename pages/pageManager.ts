import { Page } from "@playwright/test"
import { LoginPage } from '../pages/login'
import { LoggedInPage } from '../pages/loggedIn'
export class PageManager {

    private readonly page: Page;
    private readonly loggedInPage: LoggedInPage;
    private readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.loggedInPage = new LoggedInPage(this.page);
    }

    onLoginPage(): LoginPage {
        return this.loginPage;
    }

    onLoggedInPage(): LoggedInPage {
        return this.loggedInPage;
    }

}