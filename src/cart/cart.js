import { CartItem } from "./cart-item.js";
import { Product } from "../product/product.js";
import { DiscountStrategy } from "../discount-strategy/discount-strategy.js";

export class Cart {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return this.#items.map((item) => item.clone());
  }

  get total() {
    return this.#items.reduce((sum, item) => sum + item.subtotal(), 0);
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer");
    }

    const existingItem = this.#items.find(
      (item) => item.product.name === product.name,
    );

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
      return;
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

    if (
      typeof discount !== "number" ||
      Number.isNaN(discount) ||
      discount < 0
    ) {
      throw new Error("Discount must be a non-negative number.");
    }

    return Math.max(0, this.total - discount);
  }
}
