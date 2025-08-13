import { Product } from "../product/product";
import { CartItem } from "./cart-item";

export class Cart {
  #items = [];

  constructor() {}

  get items() {
    return [...this.#items];
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer.");
    }

    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i].product.name === product.name) {
        this.#items[i].product.quantity += quantity;
        return;
      }
    }

    const newCartItem = new CartItem(product, quantity);
    this.#items.push(newCartItem);
  }

  get total() {
    let sum = 0;

    for (let item of this.#items) {
      sum += item.subtotal;
    }

    return sum;
  }
}
