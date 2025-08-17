import { Product } from "../product/product";
import { CartItem } from "./cart-item";
import { DiscountStrategy } from "../discount-strategy/discount-strategy";

export class Cart {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return [...this.#items];
  }

  get total() {
    return this.#items.reduce(
      (accumulator, item) => accumulator + item.subtotal,
      0
    );
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer.");
    }

    const item = this.#items.find((item) => item.product.name === product.name);

    if (item) {
      item.quantity = item.quantity + quantity;
      return;
    }

    this.#items.push(new CartItem(product, quantity));
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    this.#items = this.#items.filter(
      (item) => item.product.name !== product.name
    );
  }

  applyDiscount(strategy) {
    if (!(strategy instanceof DiscountStrategy)) {
      throw new Error(
        "Strategy must be an instance of DiscountStrategy subclass."
      );
    }

    const discount = strategy.calculate(this);

    if (!Number.isInteger(discount) || Number.isNaN(discount) || discount < 0) {
      throw new Error("Discount must be a non-negative number.");
    }

    const afterDiscount = this.total - discount;

    return Math.max(afterDiscount, 0);
  }
}
