import { Page } from "@playwright/test";

export async function signUp(page: Page, userName: string, email: string, password: string) {
    await page.getByTestId("auth-username").fill(userName);
    await page.getByTestId("auth-email").fill(email);
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("register-confirm-password").fill(password);
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();
};

export async function createArticle(
    page: Page,
    title: string,
    description:string,
    body: string
    ) {
    await page.getByTestId("nav-new-article").click();
    await page.getByTestId("editor-title").fill(title);
    await page.getByTestId("editor-description").fill(description);
    await page.getByTestId("editor-body").fill(body);
    await page.getByTestId("editor-submit").click();
};

export async function followAuthor(page: Page, article: string) {
    await page.getByTestId("feed-tab-global").click();
    await page.getByTestId("home-search-input").fill(article);
    await page.getByTestId("home-filter-apply").click();
    await page.getByText(article).click();
    await page.getByTestId("article-follow-button").click();
};

export async function logout(page:Page) {
    await page.getByTestId("nav-profile").click();
    await page.getByText("Edit profile").click();
    await page.getByTestId("logout-button").click();
};
