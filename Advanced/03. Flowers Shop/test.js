const { expect } = require("chai");
const { flowerShop } = require("./flowerShop");

describe("Test", () => {
  describe(`calcPriceOfFlowers`, () => {
    //happy path
    it("happy path", () => {
      expect(flowerShop.calcPriceOfFlowers("a", 1, 1)).to.equal(
        "You need $1.00 to buy a!"
      );
    });
    // invalid input
    it("invalid input", () => {
      expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw();
      expect(() => flowerShop.calcPriceOfFlowers("a", "1", 1)).to.throw();
      expect(() => flowerShop.calcPriceOfFlowers("a", 1, "1")).to.throw();
    });
  });
  describe(`checkFlowersAvailable`, () => {
    // happy path
    it("happy path", () => {
      expect(flowerShop.checkFlowersAvailable("a", ["a", "b", "c"])).to.equal(
        "The a are available!"
      );
    });
    //invalid
    it("invalid path", () => {
      expect(flowerShop.checkFlowersAvailable("d", ["a", "b", "c"])).to.equal(
        "The d are sold! You need to purchase more!"
      );
    });
  });
  describe(`sellFlowers`, () => {
    //happy path
    it("happy path", () => {
      expect(flowerShop.sellFlowers(["a", "b", "c"], 0)).to.deep.equal("b / c");
    });
    //invalid input
    it("invalid input", () => {
      expect(() => flowerShop.sellFlowers(["a", "b", "c"], "1")).to.throw();
      expect(() => flowerShop.sellFlowers("a", 1)).to.throw();
      expect(() => flowerShop.sellFlowers(["a", "b"], -1)).to.throw();
      expect(() => flowerShop.sellFlowers(["a", "b"], 4)).to.throw();
    });
  });
});
