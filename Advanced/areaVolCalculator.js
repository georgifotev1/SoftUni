function solve(area, vol, input) {
  const data = JSON.parse(input);
  const result = [];

  for (let x of data) {
    let current = {
      area: area.call(x),
      volume: vol(x),
    };
    result.push(current);
  }
  return result;
}

function vol() {
  return Math.abs(this.x * this.y * this.z);
}
function area() {
  return Math.abs(this.x * this.y);
}

solve(
  area,
  vol,
  `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`
);
