export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (
      name &&
      typeof name === "string" &&
      typeof name !== "boolean" &&
      name.length !== 0 &&
      name.trim().length > 0
    ) {
      this.#name = name;
    } else {
      throw new Error("Name must be a non-empty string.");
    }
    if (price >= 0 && typeof price === "number") {
      this.#price = price;
    } else {
      throw new Error("Price must be a non-negative number.");
    }
  }

  get name() {
    return this.#name.trim();
  }

  get price() {
    return this.#price;
  }
}
