class Stringer {
  constructor(str, length) {
    this.innerString = str;
    this.innerLength = length;
  }

  increase(length) {
    return (this.innerLength = this.innerLength + length);
  }

  decrease(length) {
    if (this.innerLength - length < 0) {
      return (this.innerLength = 0);
    }
    return (this.innerLength = this.innerLength - length);
  }

  toString() {
    if (this.innerLength == 0) {
      return `...`;
    } else if (this.innerLength < this.innerString.length) {
      const difference = this.innerString.length - this.innerLength;
      return this.innerString.slice(0, -difference) + "...";
    } else {
      return this.innerString;
    }
  }
}

let test = new Stringer("Test", 5);
console.log(test.toString());
test.decrease(3);
console.log(test.toString());
test.decrease(5);
console.log(test.toString());
test.increase(4);
console.log(test.toString());
