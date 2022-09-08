const { expect } = require("chai");

function lookupChar(string, index) {
  if (typeof string !== "string" || !Number.isInteger(index)) {
    return undefined;
  }
  if (string.length <= index || index < 0) {
    return "Incorrect index";
  }
  return string.charAt(index);
}

describe("test", () => {
  it("return undefined if param1 is number", () => {
    expect(lookupChar(5, 5)).to.be.undefined;
  });
  it("return undefined if index is string", () => {
    expect(lookupChar("str", "5")).to.be.undefined;
  });
  it("return Incorrect index if index is higher", () => {
    expect(lookupChar("str", 10)).to.equal("Incorrect index");
  });
  it("return Incorrect index if index is lower", () => {
    expect(lookupChar("str", -10)).to.equal("Incorrect index");
  });
  it("return char if everything is ok", () => {
    expect(lookupChar("str", 0)).to.equal("s");
  });
  it("return undefined if index is float", () => {
    expect(lookupChar("str", 0.1)).to.be.undefined;
  });
});
