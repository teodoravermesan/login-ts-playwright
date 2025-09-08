import { Locator, Page } from "@playwright/test"


export class LoginPage{
    page: Page;
    username: Locator;
    password: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Submit' });
    }

    async testLogin(username: string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

}