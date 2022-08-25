function juiceFlavours(arr) {
  let juices = {};
  let bottles = {};

  for (let juice of arr) {
    let [flavour, quantity] = juice.split(" => ");

    if (juices.hasOwnProperty(flavour) == false) {
      juices[flavour] = Number(quantity);
    } else {
      juices[flavour] += Number(quantity);
    }

    if (juices[flavour] >= 1000) {
      if (bottles.hasOwnProperty(flavour) == false) {
        bottles[flavour] = 0;
      }
      while (juices[flavour] >= 1000) {
        bottles[flavour]++;
        juices[flavour] -= 1000;
      }
    }
  }

  for (let bottle in bottles) {
    console.log(`${bottle} => ${bottles[bottle]}`);
  }
}
juiceFlavours([
  "Kiwi => 234",
  "Pear => 2345",
  "Watermelon => 3456",
  "Kiwi => 4567",
  "Pear => 5678",
  "Watermelon => 6789",
]);
