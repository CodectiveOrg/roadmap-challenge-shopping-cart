export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name === "string" && name !== "") {
      this.#name = name.trim();
    }
    if (typeof price === "number" && !isNaN(price)) {
      this.#price = price;
    }
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}
