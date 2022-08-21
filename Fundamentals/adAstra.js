function adAstra(input) {
  let regex =
    /(#|\|)(?<name>[A-Za-z\s]+)\1(?<tht>[0-9]{2,2}\/[0-9]{2,2}\/[0-9]{2,2})\1(?<calories>\d{1,5})\1/g;
  let matches = input[0].matchAll(regex);
  let totalCalories = 0;
  let products = [];

  for (let match of matches) {
    let name = match.groups.name;
    let tht = match.groups.tht;
    let calories = match.groups.calories;
    products.push({ name, tht, calories });
    totalCalories += +calories;
  }
  let days = Math.trunc(totalCalories / 2000);
  console.log(`You have food to last you for: ${days} days!`);
  products.forEach((product) => {
    console.log(
      `Item: ${product.name}, Best before: ${product.tht}, Nutrition: ${product.calories}`
    );
  });
}
adAstra([
  "#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|",
]);
