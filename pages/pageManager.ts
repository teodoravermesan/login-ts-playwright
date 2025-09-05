import { Page, expect } from "@playwright/test"
import { LoginPage } from '../pages/login'
import { LoggedInPage } from '../pages/loggedIn'
export class PageManager {

    private readonly page: Page
    private readonly loggedinPage: LoggedInPage
    private readonly loginPage: LoginPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.loggedinPage = new LoggedInPage(this.page)

    }

    onLoginPage() {
        return this.loginPage
    }

    onLoggedinPage() {
        return this.loggedinPage
    }

}