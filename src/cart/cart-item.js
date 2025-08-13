function validateQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return false;
  }

  return true;
}

import { Product } from "../product/product";

export class CartItem {
  #product;
  #quantity;

  constructor(product, quantity) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!validateQuantity(quantity)) {
      throw new Error("Quantity must be a positive integer.");
    }

    this.#product = product;
    this.#quantity = quantity;
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity;
  }

  get subtotal() {
    return this.#product.price * this.#quantity;
  }

  set quantity(value) {
    if (!validateQuantity(value)) {
      throw new Error("Quantity must be a positive integer.");
    }
    this.#quantity = value;
  }
}
