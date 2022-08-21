function activationKeys(input) {
  let key = input.shift();

  while (input[0] != "Generate") {
    let line = input.shift().split(">>>");
    let command = line.shift();

    if (command == "Contains") {
      let substring = line[0];
      console.log(
        key.includes(substring)
          ? `${key} contains ${substring}`
          : `Substring not found!`
      );
    } else if (command == "Flip") {
      let param = line[0];
      let startIndex = line[1];
      let endIndex = line[2];
      let first = key.slice(0, +startIndex);
      let second = key.slice(+endIndex);
      let substr = key.slice(+startIndex, +endIndex);
      param == "Upper"
        ? (substr = substr.toUpperCase())
        : (substr = substr.toLowerCase());

      key = `${first}${substr}${second}`;
      console.log(key);
    } else if (command == "Slice") {
      let startIndex = line[0];
      let endIndex = line[1];
      let first = key.slice(0, +startIndex);
      let second = key.slice(+endIndex);
      key = first + second;
      console.log(key);
    }
  }
  console.log(`Your activation key is: ${key}`);
}
activationKeys([
  "abcdefghijklmnopqrstuvwxyz",
  "Slice>>>2>>>6",
  "Flip>>>Upper>>>3>>>14",
  "Flip>>>Lower>>>5>>>7",
  "Contains>>>def",
  "Contains>>>deF",
  "Generate",
]);
