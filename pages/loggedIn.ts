import { Locator, Page } from "@playwright/test";

export class LoggedInPage {
    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('link', { name: 'Log out' });
    }

    async logOut(): Promise<void> {
        await this.logoutButton.click();
    }
}