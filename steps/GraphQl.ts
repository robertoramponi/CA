import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { page } from "./world";
import * as framework from "../framework/framework";
import { expect } from "playwright/test";
import fs from "fs"

Given('i invoke graphql {string} service', async function(service_selector: string) {
    const requestDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE = await page.request.post(framework.urlApiSelector("graph", service_selector), 
    {
        data: {
            query: framework.queryCreation()
        }
    })

    const responseDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE_TIME = responseDate - requestDate
})

Given('i invoke graphql {string} service at page {string}', async function(service_selector: string, page_number: string) {
    const requestDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE = await page.request.post(framework.urlApiSelector("graph", service_selector), 
    {
        data: {
            query: framework.queryCreation("","",page_number)
        }
    })

    const responseDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE_TIME = responseDate - requestDate
})

Given('i invoke graphql {string} service with filters {string} and values {string}', async function(service_selector: string, features: string, values: string) {
    global.CURRENT_RESPONSE = await page.request.post(framework.urlApiSelector("graph", service_selector), 
    {
        data: {
            query: framework.queryCreation(features,values)
        }
    })
})

Then('character graphql api successful call should retrieve {int} entries', async function (entries: number) {
    const response = await global.CURRENT_RESPONSE.json()
    expect(response.data.characters.info.count).toBe(entries)
})

Then('character graphql api successful call should match entire response', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_full_graphql_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character graphql api successful call should return the correct page', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_single_page_graphql_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character graphql api successful call should return the correct filtered characters', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_features_graphql_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})