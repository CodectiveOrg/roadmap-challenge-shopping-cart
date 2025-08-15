import { Product } from "../product/product.js";
import { CartItem } from "./cart-item.js";
import { DiscountStrategy } from "../discount-strategy/discount-strategy.js";

export class Cart {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return [...this.#items];
  }

  get total() {
    if (this.#items.length === 0) {
      return 0;
    }
    if (this.#items.length === 1) {
      return this.#items[0].subtotal;
    }

    return this.#items.reduce(
      (acc, currentValue) => acc + currentValue.subtotal,
      0,
    );
  }

  addProduct(product, quantity = 1) {
    if (product === null || product === undefined) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!product) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!(Object.getPrototypeOf(product) === Product.prototype)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer.");
    }

    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i].product.name === product.name) {
        this.#items[i].quantity += quantity;

        return;
      }
    }

    this.#items.push(new CartItem(product, quantity));
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    this.#items = this.#items.filter(
      (item) => item.product.name !== product.name,
    );
  }

  applyDiscount(strategy) {
    if (!(strategy instanceof DiscountStrategy)) {
      throw new Error(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    }

    const discount = strategy.calculate(this);

    if (discount < 0) {
      throw new Error("Discount must be a non-negative number.");
    }

    if (isNaN(discount)) {
      throw new Error("Discount must be a non-negative number.");
    }

    if (this.total - discount < 0) {
      return 0;
    }

    if (typeof discount === "number") {
      return this.total - discount;
    } else {
      throw new Error("Discount must be a non-negative number.");
    }
  }
}
