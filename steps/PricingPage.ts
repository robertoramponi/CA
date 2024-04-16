import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import * as framework from "../framework/framework";
import { page }  from "./world"
import { expect } from "playwright/test";
import { i18n } from "../framework";

When('{string} is selected', async function (tab_selector: string) {
    await page.getByText(tab_selector).click()
})

Then('pricing page should display {string} pricing plan', async function (plan: string) {
    await expect(page.getByText(plan).first()).toBeVisible()
})

When('{string} pricing plan is selected', async function (selection: string) {
    const collection = {
        "Small Teams": i18n.en.simple_plan_enroll_button
    }
    await page.getByRole('button', { name: collection[selection], exact: true }).click()
})

Then('pricing page should allow entering details of {string} pricing plan', async function (pricing_option: string) {
    await expect(page.getByRole('button', { name: i18n.en.enroll }).nth(1)).toBeVisible()
    await expect(page.getByText(i18n.en.simple_plan_heading)).toBeVisible()
    expect(page.url()).toBe(framework.urlCreator("simple_plan_enroll"))
})

Then('pricing page should display mandatory message for form fields to be filled', async function (table: DataTable) {
    let index = 0
    for (const row of table.hashes()) {
        await page.getByRole('textbox', { name: i18n.en[row.fields] }).waitFor({ state: 'visible' })
        await page.getByRole('textbox', { name: i18n.en[row.fields] }).fill("test")
        await page.getByRole('textbox', { name: i18n.en[row.fields] }).clear()
        await expect(page.getByText(i18n.en.alert_generic).nth(index)).toBeVisible()
        index++
    }
})

Then('pricing page should inform the user about incorrect email format', async function () {
    await page.getByRole('textbox', { name: i18n.en.email }).waitFor({ state: 'visible' })
    await page.getByRole('textbox', { name: i18n.en.email }).fill("test")
    await page.keyboard.press('Tab')
    await expect(page.getByText(i18n.en.alert_email_message)).toBeVisible()
})

Then('pricing page should inform the user about incorrect password format', async function (table: DataTable) {
    for (const row of table.hashes()) {
        await page.getByRole('textbox', { name: i18n.en.password }).waitFor({ state: 'visible' })
        await page.getByRole('textbox', { name: i18n.en.password }).fill(row.passwords)
        await expect(page.getByText(i18n.en.alert_password_message)).toBeVisible()
        await page.keyboard.press('Tab')
        await page.getByRole('textbox', { name: i18n.en.password }).clear()
    }
})