Feature: Landing Page Feature
    Scenario: User can see the landing page
        Given I visit the landing page
        Then I should see the landing page

    Scenario: User can see the featured recipes
        Given I visit the landing page
        Then I should see the featured recipes title
        And I should see the three featured recipes:
            | Recipe Name                   |
            | Cinnamon Rolls                |
            | Madagascan Vanilla Cheesecake |
            | Crumble Churro Cookies        |