import { Locator, Page } from "@playwright/test"


export class LoginPage{
    page: any;
    username: Locator;
    password: Locator;
    loginButton: Locator;


    constructor(page) {
        this.page = page;
        this.username = page.getByLabel('Username')
        this.password = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', {name: 'Submit'})
    }

    async testLogin(username, password){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

}