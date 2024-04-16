import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, Page } from 'playwright'
const { chromium } = require('playwright');

let page: Page
let browser: Browser

setDefaultTimeout(1000000)

Before(async () => {
    try {
        browser = await chromium.launch({ headless: false })
        const context = await browser.newContext()
        page = await context.newPage()
    }
    catch {
        throw new Error('new context and page definition failed')
    }
    return page
})


After(async () => {
    await browser.close()
})

export { page, browser }