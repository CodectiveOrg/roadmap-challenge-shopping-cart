export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name === "string") {
      if (name.trim().length === 0) {
        throw new Error("Name must be a non-empty string.");
      }
    }

    if (typeof name !== "string") {
      throw new Error("Name must be a non-empty string.");
    }

    if (typeof price === "number") {
      if (price < 0) {
        throw new Error("Price must be a non-negative number.");
      }
    }

    if (typeof price !== "number" || isNaN(price)) {
      throw new Error("Price must be a non-negative number.");
    }

    this.#name = name.trim();
    this.#price = price;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}
