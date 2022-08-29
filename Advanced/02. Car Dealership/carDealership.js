class CarDealership {
  constructor(name) {
    this.name = name;
    this.availableCars = [];
    this.soldCars = [];
    this.totalIncome = 0;
  }

  addCar(model, horsepower, price, mileage) {
    if (
      model == "" ||
      horsepower != parseInt(horsepower) ||
      horsepower < 0 ||
      price < 0 ||
      mileage < 0
    ) {
      throw new Error("Invalid input!");
    }
    this.availableCars.push({ model, horsepower, price, mileage });
    return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(
      2
    )} km - ${price.toFixed(2)}$`;
  }

  sellCar(model, desiredMileage) {
    let finalPrice = 0;
    const match = this.availableCars.find((element) => element.model == model);
    let carHP = match.horsepower;
    let index = this.availableCars.indexOf(match);
    if (match) {
      let carMileage = Number(match.mileage);
      if (carMileage <= desiredMileage) {
        finalPrice = Number(match.price);
      } else if (
        carMileage > desiredMileage &&
        carMileage <= 40000 + desiredMileage
      ) {
        finalPrice = Number(match.price) * 0.95;
      } else if (carMileage > 40000 + desiredMileage) {
        finalPrice = Number(match.price) * 0.9;
      }
    } else {
      throw new Error(`${model} was not found!`);
    }
    this.soldCars.push({ model, carHP, finalPrice });
    this.totalIncome += finalPrice;
    this.availableCars.splice(index, 1);
    return `${model} was sold for ${finalPrice.toFixed(2)}$`;
  }

  currentCar() {
    if (this.availableCars.length > 0) {
      let message = `-Available cars:\n`;
      for (let i = 0; i < this.availableCars.length; i++) {
        let el = this.availableCars[i];
        if (i == this.availableCars.length - 1) {
          message += `---${el.model} - ${
            el.horsepower
          } HP - ${el.mileage.toFixed(2)} km - ${el.price.toFixed(2)}$`;
        } else {
          message += `---${el.model} - ${
            el.horsepower
          } HP - ${el.mileage.toFixed(2)} km - ${el.price.toFixed(2)}$\n`;
        }
      }
      return message;
    } else {
      return "There are no available cars";
    }
  }

  salesReport(criteria) {
    let result = `-${
      this.name
    } has a total income of ${this.totalIncome.toFixed(2)}$\n-${
      this.soldCars.length
    } cars sold:\n`;
    if (criteria == "horsepower") {
      this.soldCars.sort((a, b) => b.carHP - a.carHP);
      for (let i = 0; i < this.soldCars.length; i++) {
        let el = this.soldCars[i];
        if (i == this.soldCars.length - 1) {
          result += `---${el.model} - ${el.carHP} HP - ${el.finalPrice.toFixed(
            2
          )}$`;
        } else {
          result += `---${el.model} - ${el.carHP} HP - ${el.finalPrice.toFixed(
            2
          )}$\n`;
        }
      }
      return result;
    } else if (criteria == "model") {
      this.soldCars.sort((a, b) => a.model.localeCompare(b.model));
      for (let i = 0; i < this.soldCars.length; i++) {
        let el = this.soldCars[i];
        if (i == this.soldCars.length - 1) {
          result += `---${el.model} - ${el.carHP} HP - ${el.finalPrice.toFixed(
            2
          )}$`;
        } else {
          result += `---${el.model} - ${el.carHP} HP - ${el.finalPrice.toFixed(
            2
          )}$\n`;
        }
      }
      return result;
    } else {
      throw new Error("Invalid criteria!");
    }
  }
}
let dealership = new CarDealership("SoftAuto");

dealership.addCar("Toyota Corolla", -100, 0, 190000);
dealership.addCar("Mercedes C63", 300, 29000, 187000);
dealership.addCar("Audi A3", 120, 4900, 240000);
console.log(dealership.currentCar());
