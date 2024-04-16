@allTests
Feature: Pricing page

    As a user i want to navigate to the pricing page so that i can have an overview
    on the options offered based on my team needs

    @pricingPlans
    Scenario Outline: pricing page - should display "<plan>" pricing plan
        Given navigation to the "pricing" page
        When "<type>" is selected
        Then pricing page should display "<plan>" pricing plan

        Examples:
            | type            | plan        |
            | For Business    | Small Teams |
            | For Business    | Enterprise  |
            | For Business    | VILT        |
            | For Individuals | Monthly     |
            | For Individuals | Yearly      |

    @smallTeamOption
    Scenario: pricing page - should allow entering details of Small Teams pricing plan
        Given navigation to the "pricing" page
        When "Small Teams" pricing plan is selected
        Then pricing page should allow entering details of "Small Teams" pricing plan

    @smallTeamOptionForm
    Scenario: pricing page - should display mandatory message for form fields to be filled
        Given navigation to the "pricing" page
        When "Small Teams" pricing plan is selected
        Then pricing page should display mandatory message for form fields to be filled
            | fields     |
            | first_name |
            | last_name  |
            | email      |
            | password   |

    @smallTeamOptionFormEmailRule
    Scenario: pricing page - should inform the user about incorrect email format
        Given navigation to the "pricing" page
        When "Small Teams" pricing plan is selected
        Then pricing page should inform the user about incorrect email format

    @smallTeamOptionFormPasswordRule
    Scenario: pricing page - should inform the user about incorrect password format
        Given navigation to the "pricing" page
        When "Small Teams" pricing plan is selected
        Then pricing page should inform the user about incorrect password format
            | passwords   |
            | test        |
            | test1       |
            | test1.      |
            | Test        |
            | Test1       |
            | Test1.      |
            | Test1.testt |