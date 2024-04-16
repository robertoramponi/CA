import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { page } from "./world";
import * as framework from "../framework/framework";
import { expect } from "playwright/test";
import fs from "fs"

Given('i invoke {string} {string} service', async function(mode_selector: string, service_selector: string) {
    const requestDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE = await page.request.get(framework.urlApiSelector(mode_selector, service_selector))
    const responseDate = new Date().getMilliseconds()
    global.CURRENT_RESPONSE_TIME = responseDate - requestDate
})

Given('i invoke {string} {string} service at page {string}', async function(mode_selector: string, service_selector: string, page_number: string) {
    const url = framework.urlApiSelector(mode_selector, service_selector).replace("{{page}}", page_number)
    global.CURRENT_RESPONSE = await page.request.get(url)
})

Given('i invoke {string} {string} service to retrieve id {string}', async function(mode_selector: string, service_selector: string, id: string) {
    const url = framework.urlApiSelector(mode_selector, service_selector).replace("{{id}}", id)
    global.CURRENT_RESPONSE = await page.request.get(url)
})

Given('i invoke {string} {string} service to retrieve id {string} and {string}', async function(mode_selector: string, service_selector: string, first_id: string, second_id: string) {
    const url = framework.urlApiSelector(mode_selector, service_selector).replace("{{ids}}", `${first_id},${second_id}`)
    global.CURRENT_RESPONSE = await page.request.get(url)
})

Given('i invoke {string} {string} service with filters {string} and values {string}', async function(mode_selector: string, service_selector: string, features: string, values: string) {
    let url = framework.urlApiSelector(mode_selector, service_selector)
    const featuresArr = features.split(",")
    const valuesArr = values.split(",")

    for (let i=0; i<featuresArr.length-1; i++) {
        url = url + featuresArr[i] + "=" + valuesArr[i] + "&"
    }

    url = url + featuresArr[featuresArr.length-1] + "=" + valuesArr[valuesArr.length-1]

    global.CURRENT_RESPONSE = await page.request.get(url)
})

Given('i invoke a malformed url {string} {string} service', async function(mode_selector: string, service_selector: string) {
    const url = framework.base_api_url + `${mode_selector}/${service_selector}`
    global.CURRENT_RESPONSE = await page.request.get(url)
})


Then('character api successful call should respond with HTTP code {int}', async function (http_code:number) {
    expect(global.CURRENT_RESPONSE.status()).toBe(http_code)
})

Then('character api successful call should retrieve {int} entries', async function (entries: number) {
    const characters = await global.CURRENT_RESPONSE.json()
    expect(characters.info.count).toBe(entries)
})

Then('character api successful call should match entire response', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    //fs.writeFileSync("test.json", JSON.stringify(characters))
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_full_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character api successful call should return the correct characters ids', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_double_id_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character api successful call should return the correct filtered characters', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_features_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character api successful call should return the correct page', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_single_page_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character api successful call should return the correct character id', async function () {
    const characters = await global.CURRENT_RESPONSE.json()
    const baseFile = JSON.stringify(JSON.parse(fs.readFileSync('character_single_id_200.json', 'utf-8')))
    expect(JSON.stringify(characters)).toMatch(baseFile)
})

Then('character api successful call should respond in less than 1 second', async function () {
    expect(global.CURRENT_RESPONSE_TIME).toBeLessThanOrEqual(1000)
})