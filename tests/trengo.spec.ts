import test, { expect, request } from "@playwright/test"
import LoginPage from "../pages/loginPage"
import CustomChannelPage from "../pages/customChannelPage"
import TeamPage from "../pages/teamPage"

const loginUrl = 'https://app.trengo.com/auth/login'
const email = 'annu92goyal@gmail.com'
const password = 'Test@1234'

const customChannelUrl = 'https://app.trengo.com/admin/channels2/custom'
const newChannelName = "Test-Channel-101"
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmU4NDk4MmEyM2I5MWY1MzVkNWE2MmY4NWExZmJhZDMxOGNkNjExYTJkOWI5Y2FjNzg3MmE5N2VlOWJjYjQ1NzdmYjk0ZDBjMDAzOWRjNzMiLCJpYXQiOjE3MDE0NTQyNjcuNDk5NjE2LCJuYmYiOjE3MDE0NTQyNjcuNDk5NjE4LCJleHAiOjQ4MjU1OTE4NjcuNDkzNzgyLCJzdWIiOiI3MTQxMjUiLCJzY29wZXMiOltdfQ.e0KiWTNndf3BW26FAQWoCXP-WupSORKazjwePScNmvNVQjYAU5pZfjlSoyUEx18b-MUfZu4g8lQ4RmFoJUKvlQ'
const customChannelMessagesApi = 'https://app.trengo.com/api/v2/custom_channel_messages'
const contactId = "custom-8901234567890" 
const message = "My test message"
const successStatusCode = 200

const teamUrl = 'https://app.trengo.com/admin/teams'
const teamName = "Test-team-101"
const user = "Annu Goyal"

let channelId, teamId
let customChannelPage, teamPage

test.describe('Trengo app test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(loginUrl);
        const loginPage = new LoginPage(page);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginBtn();
        await expect(page).toHaveURL(/.*tickets/);
    });

    test("Create a custom channel", async ({ page }) => {
      await page.goto(customChannelUrl);
      customChannelPage = new CustomChannelPage(page);
      await customChannelPage.clickCreateCustomChannelButton();
      await expect(page).toHaveURL(/.*create/);
      await customChannelPage.enterChannelName(newChannelName);
      await customChannelPage.clickCreateChannelButton();
      await expect(customChannelPage.deleteChannelButton).toBeVisible();
      let channelIdentifier = await page.locator("pre:near(:text('Your unique channel identifier is:'))",).textContent();
      channelId = await page.url().replace(customChannelUrl+"/", "");
      const responseCode = await customChannelPage.sendMessageToChannel(customChannelMessagesApi, contactId, message, channelIdentifier, token)
      await expect(responseCode).toBe(successStatusCode);
      await page.goto(customChannelUrl + "/" + channelId);
      await customChannelPage.deleteCustomChannel();
  });

  test("Create a team", async ({ page }) => {
    await page.goto(teamUrl);
    teamPage = new TeamPage(page);
      await teamPage.clickCreateATeamButton();
      await teamPage.enterTeamName(teamName);
      await teamPage.selectUserValue(user);
      await teamPage.clickCreateTeamButton();
      await expect(teamPage.deleteTeamButton).toBeVisible();
      teamId = await page.url().replace(teamUrl+"/", "");
      await page.goto(teamUrl + "/" + teamId);
      await teamPage.deleteteam();
  });
});
