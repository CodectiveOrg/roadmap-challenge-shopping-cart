export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new Error("Name must be a non-empty string.");
    }

    if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
      throw new Error("Price must be a non-negative number.");
    }

    this.#name = name.trim();
    this.#price = price;
  }

  get name() {
    this.#name;
  }

  get price() {
    this.#price;
  }
}
