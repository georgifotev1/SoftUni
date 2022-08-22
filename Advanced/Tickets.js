function tickets(arr, str) {
  const result = [];

  class Ticket {
    constructor(destination, price, status) {
      this.destination = destination;
      this.price = Number(price);
      this.status = status;
    }
  }

  for (let ticket of arr) {
    let [destination, price, status] = ticket.split("|");
    result.push(new Ticket(destination, price, status));
  }

  if (str == "destination") {
    result.sort((a, b) => a.destination.localeCompare(b.destination));
  } else if (str == "price") {
    result.sort((a, b) => a.price - b.price);
  } else if (str == "status") {
    result.sort((a, b) => a.status.localeCompare(b.status));
  }
  return result;
}
tickets(
  [
    "Philadelphia|94.20|available",
    "New York City|95.99|available",
    "New York City|95.99|sold",
    "Boston|126.20|departed",
  ],
  "price"
);
