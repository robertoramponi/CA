@allTests
Feature: Main Page - search box

    As a user i want to be able to search for specific courses and visualize them 
    in the result page

    @searchBoxAvailable
    Scenario: main page - should display search box
        Given navigation to the "main" page
        Then main page should display search box

    @verifySearchResults
    Scenario Outline: main page - search box - should display correct search results "<search_input>"
        Given navigation to the "main" page
        When searching for "<search_input>"
        Then main page search box should display correct search results "<search_input>"

        Examples:
            | search_input |
            | AWS          |
            | GCP          |
            | Azure        |