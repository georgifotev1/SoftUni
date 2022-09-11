const { expect } = require("chai");
const { companyAdministration } = require("./companyAdministration");

describe("Test", () => {
  describe("hiringEmployee", () => {
    //happy path
    it("happy path", () => {
      expect(
        companyAdministration.hiringEmployee("Pesho", "Programmer", 3)
      ).to.equal(`Pesho was successfully hired for the position Programmer.`);
    });

    it("not enough experience", () => {
      expect(
        companyAdministration.hiringEmployee("Pesho", "Programmer", 2)
      ).to.equal(`Pesho is not approved for this position.`);
    });

    it("incorrect position", () => {
      expect(() =>
        companyAdministration.hiringEmployee("Pesho", "Builder", 4)
      ).to.throw();
    });
  });

  describe("calculateSalary", () => {
    //
    it("invalid input", () => {
      expect(() => companyAdministration.calculateSalary("5")).to.throw();
      expect(() => companyAdministration.calculateSalary(-1)).to.throw();
    });

    it("happy path", () => {
      expect(companyAdministration.calculateSalary(1)).to.equal(15);
    });

    it("more than 160 hours case", () => {
      expect(companyAdministration.calculateSalary(161)).to.equal(3415);
    });

    it("edge case", () => {
      expect(companyAdministration.calculateSalary(160)).to.equal(2400);
    });
  });

  describe("firedEmployee", () => {
    //
    it("happy path", () => {
      expect(companyAdministration.firedEmployee(["a", "b", "c"], 0)).to.equal(
        "b, c"
      );
    });

    it("invalid input", () => {
      expect(() => companyAdministration.firedEmployee(1, 0)).to.throw();
      expect(() =>
        companyAdministration.firedEmployee(["a", "b"], "0")
      ).to.throw();
      expect(() => companyAdministration.firedEmployee(1, 0)).to.throw();
      expect(() =>
        companyAdministration.firedEmployee(["a", "b"], -1)
      ).to.throw();
      expect(() =>
        companyAdministration.firedEmployee(["a", "b"], 2)
      ).to.throw();
    });
  });
});
