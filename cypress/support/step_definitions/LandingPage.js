import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the landing page", () => {
  cy.visit("/");
});

Then("I should see the landing page", () => {
  cy.get("h1").should("contain", "Welcome to MyRecipePal!");
});
