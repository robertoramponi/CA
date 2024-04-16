import { Locator, Page } from "playwright"
import { i18n } from "../framework";

declare global {
    var CURRENT_RESPONSE: any
    var CURRENT_RESPONSE_TIME: number
}

export const base_url = "https://cloudacademy.com/"
export const base_api_url = "https://rickandmortyapi.com/"

//export type filter = { name?: string, type?: string, status?: string, gender?: string, species?: string}

export function queryCreation(parameters: string = "", values: string = "", page_number: string = "2") {
  const fullParameters = parameters.split(",")
  const fullValues = values.split(",")
  let filterObject = ``

  for (let i=0; i<fullParameters.length-1; i++) {
    filterObject = filterObject + `${fullParameters[i]}: "${fullValues[i]}", `
  }

  filterObject = filterObject + `${fullParameters[fullParameters.length-1]}: "${fullValues[fullValues.length-1]}"`

  const filter = (parameters !== "") ? `filter: {${filterObject}}` : `filter: {}`
  const query = `query {
    characters(page: ${page_number}, ${filter}) {
      info {
        count
      }
      results {
        name,
        id,
        status,
        species,
        type,
        gender,
        origin{
          name
        },
        location{
          name
        },
        image,
        episode{
          episode
        },
        created
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`

  return query
} 

export const main_page_collection = (page: Page, selector: string, search_input: string):Locator => {
    const collection = {
        searchbox: page.getByRole('searchbox', { name: i18n.en.search_input, exact: true }),
        input_result_bar: page.getByRole('textbox', { name: i18n.en.search_input, exact: true }),
        results: page.locator('a').getByText(search_input)
    }
    return collection[selector]
}

export function urlCreator(page_selector: string) {
    const selection = {
        "main": "",
        "pricing": "pricing/?direct=true",
        "simple_plan_enroll": "checkout-beta/self-serve/account/?annually=1&seats=5"
    }
    return base_url + selection[page_selector]
}

export function urlApiSelector(mode_selector: string, service_selector: string) {
    const selection = {
        "api": {
            "character": "api/character",
            "character_page": "api/character/?page={{page}}",
            "character_id": "api/character/{{id}}",
            "character_ids": "api/character/{{ids}}",
            "character_features": "api/character/?"
        },
        "graph": {
            "character": "graphql",
        }
    }
    return base_api_url + selection[mode_selector][service_selector]
}