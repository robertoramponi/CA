@allTests
Feature: Characters rest api
    
    As a user i want to verify that the specific character api is working
    correctly and i can retrieve the needed informations based on documentation
    https://rickandmortyapi.com/documentation/#character

    @baseTest
    Scenario: character api - successful call - should respond with HTTP code 200
        Given i invoke "api" "character" service
        Then character api successful call should respond with HTTP code 200

    #grammatically incorrect to return a 404 for a non available service
    @negativeTest
    Scenario: character api - failing call - should respond with HTTP code 400
        Given i invoke "api" "charact" service
        Then character api successful call should respond with HTTP code 404

    @bodyVerification
    Scenario: character api - successful call - should retrieve 836 entries
        Given i invoke "api" "character" service
        Then character api successful call should retrieve 826 entries

    @fullBodyVerification
    Scenario: character api - successful call - should match entire response
        Given i invoke "api" "character" service
        Then character api successful call should match entire response

    @pageFilterPositive
    Scenario: character api - successful call - should return the correct page
        Given i invoke "api" "character_page" service at page "19"
        Then character api successful call should return the correct page

    @pageFilterNegative
    Scenario: character api - failing call - should respond with HTTP code 400
        Given i invoke "api" "character_page" service at page "-1"
        Then character api successful call should respond with HTTP code 400

    @idFilterPositive
    Scenario: character api - successful call - should return the correct character id
        Given i invoke "api" "character_id" service to retrieve id "2"
        Then character api successful call should return the correct character id

    @idFilterNegative
    Scenario: character api - failing call - should respond with HTTP code 404
        Given i invoke "api" "character_id" service to retrieve id "0"
        Then character api successful call should respond with HTTP code 404

    @multipleIdFilterPositive
    Scenario: character api - successful call - should return the correct characters ids
        Given i invoke "api" "character_ids" service to retrieve id "1" and "183"
        Then character api successful call should return the correct characters ids

    @multipleIdFilterNegative
    Scenario: character api - failing call - should respond with HTTP code 500
        Given i invoke "api" "character_ids" service to retrieve id "" and ""
        Then character api successful call should respond with HTTP code 500

    @featuresFilterPositive
    Scenario: character api - successful call - should return the correct filtered characters
        Given i invoke "api" "character_features" service with filters "name,status" and values "rick,alive"
        Then character api successful call should return the correct filtered characters

    @featuresFilterNegative
    Scenario: character api - failing call - should respond with HTTP code 404
        Given i invoke "api" "character_features" service with filters "name,status" and values "test,test"
        Then character api successful call should respond with HTTP code 404

    @timeResponse
    Scenario: character api - successful call - should respond in less than 1 second
        Given i invoke "api" "character" service
        Then character api successful call should respond in less than 1 second