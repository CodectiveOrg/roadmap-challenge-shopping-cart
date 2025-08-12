export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name === "string" && name.trim().length > 0) {
      this.#name = name.trim();
    } else {
      throw new Error("Name must be a non-empty string.");
    }

    if (typeof price === "number" && price >= 0 && !isNaN(price)) {
      this.#price = price;
    } else {
      throw new Error("Price must be a non-negative number.");
    }
  }

  get name() {
    this.#name;
  }

  get price() {
    this.#price;
  }
}
