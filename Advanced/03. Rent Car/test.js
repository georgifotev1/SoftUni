const { expect } = require("chai");
const rentCar = require("./rentCar");

describe("Test", () => {
  describe("searchCar", () => {
    // happy path..
    // if there are matching elements return ..
    it("happy path", () => {
      expect(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], "Audi")).to.equal(
        "There is 1 car of model Audi in the catalog!"
      );
      expect(
        rentCar.searchCar(["Volkswagen", "BMW", "Audi", "Audi"], "Audi")
      ).to.equal("There is 2 car of model Audi in the catalog!");
    });
    // else throw
    it("no matches", () => {
      expect(() =>
        rentCar.searchCar(["Volkswagen", "BMW", "Audi"], "A")
      ).to.throw();
    });
    //check if inputs are valid
    it("invalid inputs", () => {
      expect(() => rentCar.searchCar("A", "A")).to.throw();
      expect(() =>
        rentCar.searchCar(["Volkswagen", "BMW", "Audi"], [])
      ).to.throw();
      expect(() => rentCar.searchCar("A", [])).to.throw();
    });
  });
  describe("calculatePriceOfCar", () => {
    //happy path
    it("happy path", () => {
      expect(rentCar.calculatePriceOfCar("Audi", 1)).to.equal(
        `You choose Audi and it will cost $36!`
      );
    });
    // if no match
    it("no match", () => {
      expect(() => rentCar.calculatePriceOfCar("Lambo", 1)).to.throw();
    });
    // check if the inputs are valid
    it("invalid input", () => {
      expect(() => rentCar.calculatePriceOfCar(1, 1)).to.throw();
      expect(() => rentCar.calculatePriceOfCar("Audi", 1.1)).to.throw();
      expect(() => rentCar.calculatePriceOfCar(1, "Audi")).to.throw();
      expect(() => rentCar.calculatePriceOfCar("Audi", "Audi")).to.throw();
    });
  });
  describe("checkBudget", () => {
    //happy path
    it("happy path", () => {
      expect(rentCar.checkBudget(1, 1, 2)).to.equal("You rent a car!");
      expect(rentCar.checkBudget(1, 2, 2)).to.equal("You rent a car!");
    });
    // not enough money
    it("not enough money", () => {
      expect(rentCar.checkBudget(1, 3, 2)).to.equal(
        "You need a bigger budget!"
      );
    });
    // input check
    it("input check", () => {
      expect(() => rentCar.checkBudget("1", 1, 2)).to.throw();
      expect(() => rentCar.checkBudget(1, "3", 2)).to.throw();
      expect(() => rentCar.checkBudget(1, 1, "3")).to.throw();
      expect(() => rentCar.checkBudget(1, 1, 1.1)).to.throw();
      expect(() => rentCar.checkBudget(1, 1.1, 1)).to.throw();
      expect(() => rentCar.checkBudget(1.1, 1, 1)).to.throw();
    });
  });
});
