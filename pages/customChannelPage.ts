import { Page, Locator, APIRequestContext, request } from "@playwright/test"
export default class CustomChannelPage {
    readonly page: Page
    readonly createCustomChannelButton: Locator
    readonly channelNameField: Locator
    readonly createChannelButton: Locator
    readonly deleteChannelButton: Locator
    readonly deleteConfirmButton: Locator

    constructor(page: Page) {
        this.page = page
        this.createCustomChannelButton = this.page.getByText('Connect Custom channel');
        this.channelNameField = this.page.locator("input:near(:text('The internal name of this channel'))");
        this.createChannelButton = this.page.locator('button', { hasText: 'Create channel' });
        this.deleteChannelButton = this.page.locator('button', { hasText: 'Delete' });
        this.deleteConfirmButton = this.page.locator('button.danger');
    }
 
    async clickCreateCustomChannelButton() {
        await this.createCustomChannelButton.click();
    }

    async enterChannelName(channelName: string) {
        await this.channelNameField.clear();
        await this.channelNameField.fill(channelName);
    }

    async clickCreateChannelButton() {
        await this.createChannelButton.click();
    }

    async sendMessageToChannel(apiURL, contactId, message, channelIdentifier, token: string) {
        const apiContext: APIRequestContext = await request.newContext();
        const response = await apiContext.post(apiURL, {
            data: { 
              "contact": { "identifier": contactId },
              "body": { "text":  message },
              "channel": channelIdentifier
            },
            headers: {
              'accept': 'application/json',
              "content-type": "application/json",
              'authorization': "Bearer " + token
            }
          });
          return response.status();
    }

    async deleteCustomChannel() {
        await this.deleteChannelButton.click();
        await this.deleteConfirmButton.click();
    }
}