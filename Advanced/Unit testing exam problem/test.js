const { expect } = require("chai");
const { carService } = require("./serviceResources");

describe("Test", () => {
  describe("isItExpensive", () => {
    // happy path
    it("happy path - worst case", () => {
      expect(carService.isItExpensive("Engine")).to.equal(
        `The issue with the car is more severe and it will cost more money`
      );
      expect(carService.isItExpensive("Transmission")).to.equal(
        `The issue with the car is more severe and it will cost more money`
      );
    });

    it("happy path", () => {
      expect(carService.isItExpensive("abc")).to.equal(
        "The overall price will be a bit cheaper"
      );
    });
  });

  describe("discount", () => {
    it("if no discount", () => {
      expect(carService.discount(2, 10)).to.equal(
        "You cannot apply a discount"
      );
      expect(carService.discount(1, 10)).to.equal(
        "You cannot apply a discount"
      );
    });

    it("with discount", () => {
      expect(carService.discount(3, 100)).to.equal(
        `Discount applied! You saved 15$`
      );
      expect(carService.discount(7, 100)).to.equal(
        `Discount applied! You saved 15$`
      );
      expect(carService.discount(8, 100)).to.equal(
        `Discount applied! You saved 30$`
      );
    });

    it("invalid input", () => {
      expect(() => carService.discount("1", 10)).to.throw();
      expect(() => carService.discount(1, "10")).to.throw();
    });
  });

  describe("partsToBuy", () => {
    it("happy path", () => {
      expect(
        carService.partsToBuy(
          [
            { part: "blowoff valve", price: 145 },
            { part: "coil springs", price: 230 },
          ],
          ["blowoff valve", "injectors"]
        )
      ).to.equal(145);
      expect(
        carService.partsToBuy(
          [
            { part: "blowoff valve", price: 145 },
            { part: "coil springs", price: 230 },
          ],
          ["blowoff valve", "coil springs"]
        )
      ).to.equal(375);
    });

    it("empty array", () => {
      expect(
        carService.partsToBuy([], ["blowoff valve", "injectors"])
      ).to.equal(0);
    });

    it("invalid input", () => {
      expect(() => carService.partsToBuy(["a", "b"], 1)).to.throw();
      expect(() => carService.partsToBuy(1, ["a", "b"])).to.throw();
    });
  });
});
