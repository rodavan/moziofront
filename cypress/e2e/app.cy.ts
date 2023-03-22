// cypress/integration/app.spec.js
describe("Passengers Component", () => {
  it("increases and decreases passenger count", () => {
    cy.visit("http://localhost:3000"); // Replace with your app's URL where the Passengers component is rendered

    cy.get('[data-testid="increase-passengers"]').click();
    cy.get('[data-testid="passenger-count"]').should("contain", "2");

    cy.get('[data-testid="decrease-passengers"]').click();
    cy.get('[data-testid="passenger-count"]').should("contain", "1");
  });
});
