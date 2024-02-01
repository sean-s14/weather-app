// Using runBefore variable to allow user to opt-out of running the beforeEach hook for specific tests. Set runBefore to false at the beginning of the test you don't want it to run for, and then set it back to true at the end of the test.
var runBefore = true;

beforeEach(() => {
  if (runBefore) {
    cy.visit("http://localhost:3000");
  }
});

describe("Ensure searchbar works", () => {
  it("Test if searchbar exists", () => {
    cy.get("input#location-input").should("exist");
  });

  it("Ensure searchbar updates text when typing", () => {
    cy.get("input#location-input").type("london");
    cy.get("input#location-input").should("have.value", "london");
  });

  it("Test if searchbar retrieves and displays locations upon typing", () => {
    cy.get("input#location-input").type("london");
    cy.get("ul").should("exist");
    cy.get("li").should("exist");
    cy.get("li").contains("London, England, GB").should("exist");
  });
});
