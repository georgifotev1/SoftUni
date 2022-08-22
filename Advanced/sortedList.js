class List {
  constructor() {
    this.arr = [];
    this.size = 0;
  }

  add(el) {
    this.arr.push(el);
    this.size++;
    return this.arr.sort((a, b) => a - b);
  }

  remove(el) {
    if (this.arr[el] != undefined) {
      this.arr.splice(el, 1);
      this.size--;
    } else {
      throw new Error("Index otside boundary");
    }
    return this.arr.sort((a, b) => a - b);
  }

  get(el) {
    if (this.arr[el] != undefined) {
      return this.arr[el];
    } else {
      throw new Error("Index otside boundary");
    }
  }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
