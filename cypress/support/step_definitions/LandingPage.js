import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the landing page", () => {
  cy.visit("/");
});

Then("I should see the landing page", () => {
  cy.get(".intro-title").should("contain", "Welcome to MyRecipePal!");
});

Then("I should see the featured recipes title", () => {
  cy.get(".section-title").should("contain.text", "Featured Recipes");
});

Then("I should see the three featured recipes:", (dataTable) => {
  dataTable.hashes().forEach((column, index) => {
    const recipeTitleSelector = `:nth-child(${
      index + 1
    }) > .recipe-card > .recipe-details > .ant-typography`;
    cy.get(recipeTitleSelector).should("contain", column["Recipe Name"]);
  });
});
