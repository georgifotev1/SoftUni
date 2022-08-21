function argumentInfo() {
  let data = Array.from(arguments);
  let description = {};
  for (let el of data) {
    const type = typeof el;
    if (description.hasOwnProperty(type) == false) {
      description[type] = 0;
    }
    description[type]++;
    console.log(`${typeof el}: ${el}`);
  }
  const sorted = Object.entries(description)
    .sort((a, b) => b[1] - a[1])
    .map((x) => console.log(`${x[0]} = ${x[1]}`));
}

argumentInfo(
  "cat",
  42,
  function () {
    console.log("Hello world!");
  },
  5
);
