import { Given, Then, When } from "@cucumber/cucumber";
import * as framework from "../framework/framework";
import { page }  from "./world"
import { expect } from "playwright/test";
import { i18n } from "../framework";

Given('navigation to the {string} page', async function (page_selector:string) {
    const url = framework.urlCreator(page_selector)
    await page.goto(url)
})