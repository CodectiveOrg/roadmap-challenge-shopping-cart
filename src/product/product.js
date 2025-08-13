export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name === "string" && name !== "") {
      this.#name = name.trim();
    } else {
      throw new Error(`Product name must be a string.`);
    }
    if (typeof price === "number" && !isNaN(price)) {
      this.#price = price;
    } else {
      throw new Error(`Product price must be a number.`);
    }
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}
