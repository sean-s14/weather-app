var runBefore = true;

beforeEach(() => {
  if (runBefore) {
    cy.visit("http://localhost:3000");
    cy.get("input#location-input").type("london");
    cy.get("li").contains("London, England, GB").click();
  }
});

describe("Ensure five day forecast works", () => {
  it("Test if five day forecast exists", () => {
    cy.get("div#five-day-forecast-carousel").should("exist");
  });

  it("Test if five day forecast displays between five to six child elements", () => {
    cy.get("div#five-day-forecast-carousel > div > div")
      .children()
      .should("have.length.of.at.least", 5);
    cy.get("div#five-day-forecast-carousel > div > div")
      .children()
      .should("have.length.of.at.most", 6);
  });
});
