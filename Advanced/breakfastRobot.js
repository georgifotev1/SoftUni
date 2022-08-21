function solution() {
  let supplies = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };

  const recipies = {
    apple: { protein: 0, carbohydrate: 1, fat: 0, flavour: 2 },
    lemonade: { protein: 0, carbohydrate: 10, fat: 0, flavour: 20 },
    burger: { protein: 0, carbohydrate: 5, fat: 7, flavour: 3 },
    eggs: { protein: 5, carbohydrate: 0, fat: 1, flavour: 1 },
    turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
  };

  function prepare(recipy, quantity) {
    let reducedQuantity = {};

    for (let value in recipies[recipy]) {
      if (recipies[recipy][value] * quantity > supplies[value]) {
        return `Error: not enough ${value} in stock`;
      }
      reducedQuantity[value] =
        supplies[value] - recipies[recipy][value] * quantity;
    }
    Object.assign(supplies, reducedQuantity);
    return "Success";
  }

  return (controler = (str) => {
    if (str.includes("restock")) {
      let [, microelement, quantity] = str.split(" ");
      supplies[microelement] += Number(quantity);
      return "Success";
    } else if (str.includes("prepare")) {
      let [, recipy, quantity] = str.split(" ");
      return prepare(recipy, quantity);
    } else {
      return `protein=${supplies.protein} carbohydrate=${supplies.carbohydrate} fat=${supplies.fat} flavour=${supplies.flavour}`;
    }
  });
}

let manager = solution();
console.log(manager("prepare turkey 1"));
console.log(manager("restock protein 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock carbohydrate 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("report"));
