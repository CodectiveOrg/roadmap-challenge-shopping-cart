import { Product } from "../product/product.js";

export class Cart {
  #items = [];

  get items() {
    return [...this.#items];
  }

  get total() {
    return this.#items.subtotal;
  }

  addProduct(product, quantity = 1) {
    if (!Product.productValidation(product)) {
      throw new Error("Product must be an instance of Product class.");
    } else if (!Number.isInteger(quantity)) {
      throw new Error("Quantity must be a positive integer.");
    }
  }
}
