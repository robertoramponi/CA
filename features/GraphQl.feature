@allTests
Feature: Characters graphql api
    
    As a user i want to verify that the specific character api is working
    correctly and i can retrieve the needed informations based on documentation
    https://rickandmortyapi.com/documentation/#character

    @baseGraphTest
    Scenario: character graphql api - successful call - should respond with HTTP code 200
        Given i invoke graphql "character" service
        Then character api successful call should respond with HTTP code 200

    @bodyVerificationGraph
    Scenario: character graphql api - successful call - should retrieve 836 entries
        Given i invoke graphql "character" service
        Then character graphql api successful call should retrieve 826 entries

    @fullBodyVerificationGraph
    Scenario: character graphql api - successful call - should match entire response
        Given i invoke graphql "character" service
        Then character graphql api successful call should match entire response

    @pageFilterPositiveGraph
    Scenario: character graphql api - successful call - should return the correct page
        Given i invoke graphql "character" service at page "19"
        Then character graphql api successful call should return the correct page

    @pageFilterNegativeGraph
    Scenario: character graphql api - failing call - should respond with HTTP code 404
        Given i invoke graphql "character" service at page "-1"
        Then character api successful call should respond with HTTP code 404

    @featuresFilterPositiveGraph
    Scenario: character graphql api - successful call - should return the correct filtered characters
        Given i invoke graphql "character" service with filters "name,status" and values "rick,alive"
        Then character graphql api successful call should return the correct filtered characters

    @featuresFilterNegativeGraph
    Scenario: character graphql api - failing call - should respond with HTTP code 404
        Given i invoke graphql "character_features" service with filters "name,status" and values "test,test"
        Then character api successful call should respond with HTTP code 404

    @timeResponseGraph
    Scenario: character graphql api - successful call - should respond in less than 1 second
        Given i invoke graphql "character" service
        Then character api successful call should respond in less than 1 second