import { Given, Then, When } from "@cucumber/cucumber";
import * as framework from "../framework/framework";
import { page }  from "./world"
import { expect } from "playwright/test";
import { i18n } from "../framework";

Then('main page should display search box', async function () {
    await expect(page.getByRole('searchbox', { name: i18n.en.search_input, exact: true })).toBeVisible()
})

When('searching for {string}', async function (search_input: string) {
    await page.getByRole('searchbox', { name: i18n.en.search_input, exact: true }).fill(search_input)
    await page.keyboard.press('Enter')
})

Then('main page search box should display correct search results {string}', async function (search_input: string) {
    expect(await framework.main_page_collection(page, "input_result_bar", "").inputValue()).toBe(search_input)

    //await page.getByTestId("GridCol").click()//.highlight()
    await page.locator('a').getByText(search_input).highlight()
    
    const allResults = await framework.main_page_collection(page, "results", search_input).all()
    
    for (const result of allResults) {
        await expect(result).toBeVisible()
    }
})