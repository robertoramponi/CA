Features file (Gherkin) MainPageSearch and PricingPAge cover the first exercise part to work on
the web UI. 
Covered the interaction, navigation and verification via cucumber of the requested
verifications. 
Main locators used are related to the role usage and accessibility concept, as well
as leveraging on i18n (here only en for simplicity added, to be examped by using a configuration
variable depending on the languages to be covered in the SUT).

Framework file, containing specific common functions, for abstraction purposes, is used.

Short object file, to add another layer and align on POM definition is used. Here locators
that cannot be used via getByRole method are stored (for maintenance and structure), and categorized
via W3C aria roles.

Reporting done through cucumber html report "cucumber-report.html", lastly executed.

Additional 2 features file, regarding the api verification are added...one to cover GraphQL and the 
other to cover RestApi.

Still gherkin language is used to describe the scenarios (outline only used for the WebUI).

Verification on HTTP code, for both happy path and negative cases (only few) are performed.
Verification of the entire payload, for different filtering and parameter combination are done.

Payloads are stored as jsons in the format "xx_xx_xx_200.json". Those file were save as golden standard
after the service invocation and then used as verification.
Specific fields verification is performed (few cases) and possible.

Improvements as :
- better abstraction and modularization
- locators definition
- more specific cases
- locators collection to simplify maintenance and reduce code duplication