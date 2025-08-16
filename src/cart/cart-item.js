import { Product } from "../product/product";

export class CartItem {
  #product;
  #quantity;

  constructor(product, quantity) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }
    this.#product = product;
    this.quantity = quantity;
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    if (typeof value !== "number" || value <= 0 || !Number.isInteger(value)) {
      throw new Error("Quantity must be a positive integer.");
    }
    this.#quantity = value;
  }

  get subtotal() {
    return this.#product.price * this.#quantity;
  }
}
