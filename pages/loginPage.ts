import { Page, Locator } from "@playwright/test"
export default class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = this.page.getByPlaceholder('Enter your email');
        this.passwordField = this.page.getByPlaceholder('Enter your password');
        this.loginButton = page.locator('button', { hasText: 'Login' });

    }
    async enterUsername(strUser: string) {
        await this.emailField.fill(strUser)
    }
    async enterPassword(strPwd: string) {
        await this.passwordField.fill(strPwd)
    }
    async clickLoginBtn() {
        await this.loginButton.click()
    }

}
