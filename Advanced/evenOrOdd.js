const { expect } = require("chai");

function isOddOrEven(string) {
  if (typeof string !== "string") {
    return undefined;
  }
  if (string.length % 2 === 0) {
    return "even";
  }
  return "odd";
}

describe("Even or odd string length", () => {
  it("return undefined if number", () => {
    expect(isOddOrEven(5)).to.be.undefined;
  });
  it("return undefined if array", () => {
    expect(isOddOrEven([5])).to.be.undefined;
  });
  it("return undefined if object", () => {
    expect(isOddOrEven({ num: 5 })).to.be.undefined;
  });
  it("return odd if length is odd", () => {
    expect(isOddOrEven("hi!")).to.equal("odd");
  });
  it("return even if length is even", () => {
    expect(isOddOrEven("lolo")).to.equal("even");
  });
});
