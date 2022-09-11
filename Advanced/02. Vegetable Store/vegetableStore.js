class VegetableStore {
  constructor(owner, location) {
    this.owner = owner;
    this.location = location;
    this.availableProducts = [];
    this.addedProducts = [];
  }

  loadingVegetables(vegetables) {
    for (let info of vegetables) {
      let details = info.split(" ");
      let type = details[0];
      let quantity = Number(details[1]);
      let price = Number(details[2]);
      let match = this.availableProducts.find((el) => el.type == type);

      if (match) {
        match.quantity += quantity;
        if (price > match.price) {
          match.price = price;
        }
      } else {
        this.availableProducts.push({ type, quantity, price });
        this.addedProducts.push(type);
      }
    }
    return `Successfully added ${this.addedProducts.join(", ")}`;
  }

  buyingVegetables(selectedProducts) {
    let totalPrice = 0;

    for (let info of selectedProducts) {
      let details = info.split(" ");
      let type = details[0];
      let quantity = Number(details[1]);
      let match = this.availableProducts.find((el) => el.type == type);

      if (match) {
        if (match.quantity >= quantity) {
          totalPrice += quantity * match.price;
          match.quantity -= quantity;
        } else {
          throw new Error(
            `The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(
              2
            )}.`
          );
        }
      } else {
        throw new Error(
          `${type} is not available in the store, your current bill is $${totalPrice.toFixed(
            2
          )}.`
        );
      }
    }
    return `Great choice! You must pay the following amount $${totalPrice.toFixed(
      2
    )}.`;
  }

  rottingVegetable(type, quantity) {
    let match = this.availableProducts.find((el) => el.type == type);

    if (match) {
      if (quantity > match.quantity) {
        match.quantity = 0;
        return `The entire quantity of the ${type} has been removed.`;
      } else {
        match.quantity -= quantity;
        return `Some quantity of the ${type} has been removed.`;
      }
    } else {
      throw new Error(`${type} is not available in the store.`);
    }
  }

  revision() {
    let message = `Available vegetables:\n`;
    this.availableProducts
      .sort((a, b) => a.price - b.price)
      .forEach((el) => (message += `${el.type}-${el.quantity}-$${el.price}\n`));
    message += `The owner of the store is ${this.owner}, and the location is ${this.location}.`;
    return message;
  }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(
  vegStore.loadingVegetables([
    "Okra 2.5 3.5",
    "Beans 10 2.8",
    "Celery 5.5 2.2",
    "Celery 0.5 2.5",
  ])
);
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());
