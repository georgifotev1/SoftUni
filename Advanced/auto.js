function autoEngineering(input) {
  let collection = {};

  for (let auto of input) {
    let [brand, model, quantity] = auto.split(" | ");
    if (collection.hasOwnProperty(brand) == false) {
      collection[brand] = {};
    }
    if (collection[brand].hasOwnProperty(model) == false) {
      collection[brand][model] = 0;
    }
    collection[brand][model] += Number(quantity);
  }

  for (let brand in collection) {
    console.log(brand);
    Object.entries(collection[brand]).forEach((el) =>
      console.log(`###${el[0]} -> ${el[1]}`)
    );
  }
}
autoEngineering([
  "Audi | Q7 | 1000",
  "Audi | Q6 | 100",
  "BMW | X5 | 1000",
  "BMW | X6 | 100",
  "Citroen | C4 | 123",
  "Volga | GAZ-24 | 1000000",
  "Lada | Niva | 1000000",
  "Lada | Jigula | 1000000",
  "Citroen | C4 | 22",
  "Citroen | C5 | 10",
]);
