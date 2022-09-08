const { expect } = require("chai");
const { isSymmetric } = require("./symmetry");

describe("Symmetry checker", () => {
  it("must work with symmetric numeric array", () => {
    expect(isSymmetric([1, 2, 2, 1])).to.be.true;
  });

  it("returns false if the array is non-symmetric", () => {
    expect(isSymmetric([1, 2, 3])).to.be.false;
  });

  it("returns false if the input is non-array", () => {
    expect(isSymmetric(5)).to.be.false;
  });

  it("must work with symmetric sting array", () => {
    expect(isSymmetric(["a", "b", "b", "a"])).to.be.true;
  });

  it("must work with symmetric odd-length array", () => {
    expect(isSymmetric([1, 2, 1])).to.be.true;
  });

  it("returns false for string param", () => {
    expect(isSymmetric("abba")).to.be.false;
  });

  it("returns false for type mismatched elements", () => {
    expect(isSymmetric([1, 2, 2, "1"])).to.be.false;
  });
});
