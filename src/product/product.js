export class Product {
  #name;
  #price;

  constructor(name, price) {
    if (this.#nameValidation(name)) {
      this.#name = name.trim();
    } else {
      throw new Error(`Name must be a non-empty string.`);
    }
    if (this.#priceValidation(price)) {
      this.#price = price;
    } else {
      throw new Error(`Price must be a non-negative number.`);
    }
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  #nameValidation(name) {
    return typeof name === "string" && name !== "";
  }

  #priceValidation(price) {
    return typeof price === "number" && !isNaN(price);
  }

  static productValidation(product) {
    return (
      this.#nameValidation(product.name) && this.#priceValidation(product.price)
    );
  }
}
