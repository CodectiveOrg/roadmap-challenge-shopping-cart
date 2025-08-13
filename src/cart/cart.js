import { Product } from "../product/product.js";
import { CartItem } from "./cart-item.js";

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
    } else {
      if (this.#items.find((item) => item.product.name === product.name)) {
        quantity++;
      } else {
        this.#items.push(new CartItem(product, quantity));
      }
    }
  }

  removeProduct(product) {
    if (!Product.productValidation(product)) {
      throw new Error("Product must be an instance of Product class.");
    } else {
      /// bet this won't work
      this.#items.splice(this.#items.indexOf(product), 1);
    }
  }

  applyDiscount(strategy) {}
}
