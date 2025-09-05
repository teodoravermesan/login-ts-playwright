import { Locator, Page } from "@playwright/test"

export class LoggedInPage{
    page: Page;
    loggoutButton: Locator;


    constructor(page) {
        this.page = page;
        this.loggoutButton = page.getByRole('link', { name: 'Log out' })
    }

    async logOut(){
        await this.loggoutButton.click()
    }

}