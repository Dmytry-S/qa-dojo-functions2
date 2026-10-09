import { test, expect } from "@playwright/test";
import { createArticle, followAuthor, logout, signUp } from "./actions";

test('TC-001, Create articles', async ({ page }) => {
    const name = () => `user-${Math.random() * 10000}`;
    const email = () => `u-${Math.random() * 10000}@testoy.com`;
    const password = 'tr37091F';
    const articleTitle = `arti-${Math.floor(Math.random() * 11000)}`;
    const articleDescription = 'Art description';
    const articleBody = 'Body Text';

    await page.goto("/register");
    await signUp(page, name(), email(), password);
    await expect(page.getByTestId("nav-profile")).toBeVisible();
    let articlesTitles = [];
    for(let i = 1; i <= 10; i++) {
        await createArticle(
            page,
            articleTitle+'_'+i,
            articleDescription,
             articleBody
            );
        articlesTitles.push(articleTitle+'_'+i);
        await expect(page.getByTestId("article-title")).toHaveText(articleTitle+'_'+i);
    };
    await logout(page);
    await page.getByTestId("nav-sign-up").click();
    await signUp(page, name(), email(), password);
    await followAuthor(page, articlesTitles[1]);
    await page.getByTestId("nav-home").click();
    for(const item of articlesTitles) {
        await expect(page.getByTestId("article-list"), `${item} is not created`).toContainText(item)
    }
});