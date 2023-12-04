import { Page, Locator } from "@playwright/test"
export default class TeamPage {
    readonly page: Page
    readonly createATeamButton: Locator
    readonly teamNameField: Locator
    readonly selectUserField: Locator
    readonly selectUser: (user: string) => Locator
    readonly selectChannelField: Locator
    readonly selectChannel: (channel: string) => Locator
    readonly createTeamButton: Locator
    readonly deleteTeamButton: Locator
    readonly deleteConfirmButton: Locator

    constructor(page: Page) {
        this.page = page
        this.createATeamButton = this.page.getByText('Create a team');
        this.teamNameField = this.page.getByPlaceholder("Sales Team");
        this.selectUserField = this.page.getByPlaceholder("Select one or more users");
        this.selectUser = (user: string) =>this.page.locator('span.multiselect__option>span',{ hasText:`${user}`});
        this.selectChannelField = this.page.getByPlaceholder("Select one or more channels");
        this.selectChannel = (channel: string) =>this.page.getByText(`${channel}`);
        this.createTeamButton = this.page.locator('button', { hasText: 'Create team' });
        this.deleteTeamButton = this.page.locator('button', { hasText: 'Delete team' });
        this.deleteConfirmButton = this.page.locator('button.danger');
    }
    
    async clickCreateATeamButton() {
        await this.createATeamButton.click();
    }

    async enterTeamName(teamName: string) {
        await this.teamNameField.fill(teamName);
    }

    async selectUserValue(user: string) {
        await this.selectUserField.click();
        await this.selectUser(user).click();
    }

    async selectChannelValue(channel: string) {
        await this.selectChannelField.click();
        await this.selectUser(channel).click();
    }

    async clickCreateTeamButton() {
        await this.createTeamButton.click();
    }
    
    async deleteteam() {
        await this.deleteTeamButton.click();
        await this.deleteConfirmButton.click();
    }
}