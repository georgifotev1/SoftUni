class Garden {
  constructor(spaceAvailable) {
    this.spaceAvailable = spaceAvailable;
    this.plants = [];
    this.storage = [];
  }

  addPlant(plantName, spaceRequired) {
    if (spaceRequired > this.spaceAvailable) {
      throw new Error("Not enough space in the garden.");
    } else {
      this.spaceAvailable -= spaceRequired;
      this.plants.push({ plantName, spaceRequired, ripe: false, quantity: 0 });
      return `The ${plantName} has been successfully planted in the garden.`;
    }
  }

  ripenPlant(plantName, quantity) {
    if (quantity <= 0) {
      throw new Error(`The quantity cannot be zero or negative.`);
    }
    for (let plant of this.plants) {
      if (plant.plantName == plantName) {
        if (plant.ripe == true) {
          throw new Error(`The ${plantName} is already ripe.`);
        } else if (quantity == 1) {
          plant.ripe = true;
          plant.quantity += quantity;
          return `${quantity} ${plantName} has successfully ripened.`;
        } else {
          plant.ripe = true;
          plant.quantity += quantity;
          return `${quantity} ${plantName}s have successfully ripened.`;
        }
      }
    }
    throw new Error(`There is no ${plantName} in the garden.`);
  }

  harvestPlant(plantName) {
    for (let plant of this.plants) {
      if (plant.plantName == plantName) {
        if (plant.ripe == false) {
          throw new Error(
            `The ${plantName} cannot be harvested before it is ripe.`
          );
        }
        let index = this.plants.indexOf(plant);
        let currentPlantName = plant.plantName;
        let currentQuantity = plant.quantity;
        this.spaceAvailable += plant.spaceRequired;
        this.storage.push({ currentPlantName, currentQuantity });
        this.plants.splice(index, 1);
        return `The ${plantName} has been successfully harvested.`;
      }
    }
    throw new Error(`There is no ${plantName} in the garden.`);
  }

  generateReport() {
    let planstArr = [];
    let storageArr = [];
    this.plants.forEach((el) => planstArr.push(el.plantName));
    planstArr.sort((a, b) => a.localeCompare(b));
    this.storage.forEach((el) =>
      storageArr.push(`${el.currentPlantName} (${el.currentQuantity})`)
    );
    if (this.storage.length == 0) {
      return `The garden has ${
        this.spaceAvailable
      } free space left.\nPlants in the garden: ${planstArr.join(
        ", "
      )}\nPlants in storage: The storage is empty.`;
    } else {
      return `The garden has ${
        this.spaceAvailable
      } free space left.\nPlants in the garden: ${planstArr.join(
        ", "
      )}\nPlants in storage: ${storageArr.join(", ")}`;
    }
  }
}
const myGarden = new Garden(250);
console.log(myGarden.addPlant("apple", 20));
console.log(myGarden.addPlant("orange", 200));
console.log(myGarden.addPlant("raspberry", 10));
console.log(myGarden.ripenPlant("apple", 10));
console.log(myGarden.ripenPlant("orange", 1));
console.log(myGarden.harvestPlant("orange"));
console.log(myGarden.harvestPlant("apple"));
console.log(myGarden.generateReport());
