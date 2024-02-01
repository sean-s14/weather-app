var runBefore = true;

beforeEach(() => {
  if (runBefore) {
    cy.visit("http://localhost:3000");
    cy.get("input#location-input").type("london");
    cy.get("li").contains("London, England, GB").click();
  }
});

describe("Current Forecast", () => {
  it("should have a current forecast section", () => {
    cy.get("#current-forecast").should("exist");
  });

  it("should display the correct location", () => {
    cy.get("#current-forecast [aria-label='location']").contains(
      "Forecast for London, GB at "
    );
  });

  it("should display the correct date", () => {
    const now = new Date();
    const dateString = now.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    cy.get("#current-forecast").contains(dateString);
  });

  it("should display the current temperature", () => {
    cy.get("#current-forecast [aria-label='current temperature']").should(
      "exist"
    );
    cy.get("#current-forecast [aria-label='current temperature']").contains(
      /\d+\.\d+/
    );
  });

  it("should display the minimum and maximum temperatures", () => {
    cy.get("#current-forecast [aria-label='minimum temperature']").should(
      "exist"
    );
    cy.get("#current-forecast [aria-label='minimum temperature']").contains(
      /\d+°[CF]/
    );
    cy.get("#current-forecast [aria-label='maximum temperature']").should(
      "exist"
    );
    cy.get("#current-forecast [aria-label='maximum temperature']").contains(
      /\d+°[CF]/
    );
  });

  it("should display 2 buttons for toggling temperature unit", () => {
    cy.get(
      "#current-forecast [aria-label='change temperature unit to celsius']"
    ).should("exist");
    cy.get(
      "#current-forecast [aria-label='change temperature unit to fahrenheit']"
    ).should("exist");
  });

  // TODO: test functionality of buttons

  it("should display the weather description", () => {
    cy.get("#current-forecast [aria-label='weather description']").should(
      "exist"
    );
    cy.get("#current-forecast [aria-label='weather description']").contains(
      /\w+/
    );
  });

  it("should display the wind speed", () => {
    cy.get("#current-forecast [aria-label='wind speed']").should("exist");
    cy.get(
      "#current-forecast [aria-label='wind speed'] span:nth-child(2)"
    ).contains(/^(\d+(\.\d+)?)m\/s$/);
  });

  it("should display the humidity", () => {
    cy.get("#current-forecast [aria-label='humidity']").should("exist");
    cy.get(
      "#current-forecast [aria-label='humidity'] span:nth-child(2)"
    ).contains(/^(100|[1-9]\d?|0)%$/);
  });

  it("should display the pressure", () => {
    cy.get("#current-forecast [aria-label='pressure']").should("exist");
    cy.get(
      "#current-forecast [aria-label='pressure'] span:nth-child(2)"
    ).contains(/\d+ hPa/);
  });

  it("should display the latitude", () => {
    cy.get("#current-forecast [aria-label='latitude']").should("exist");
    cy.get(
      "#current-forecast [aria-label='latitude'] span:nth-child(2)"
    ).contains(/\d+\.\d+/);
  });

  it("should display the longitude", () => {
    cy.get("#current-forecast [aria-label='longitude']").should("exist");
    cy.get(
      "#current-forecast [aria-label='longitude'] span:nth-child(2)"
    ).contains(/\d+\.\d+/);
  });
});
