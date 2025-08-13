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
    return this.items
      .map((item) => item.subtotal)
      .reduce((accumulator, current) => accumulator + current, 0);
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    if (Number.isInteger(quantity) && quantity > 0) {
      const index = this.items.findIndex(
        (item) => item.product.name === product.name
      );

      if (index >= 0) {
        const product = this.items[index];
        this.#items[index] = { ...product, quantity: product.quantity + 1 };
        return;
      }

      this.#items.push(new CartItem(product, quantity));
    } else {
      throw new Error("Quantity must be a positive integer.");
    }
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    this.#items = this.items.filter(
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

    if (Number.isInteger(discount) && !isNaN(discount) && discount >= 0) {
      strategy.calculate(this.#items);
    } else {
      throw new Error("Discount must be a non-negative number.");
    }
  }
}
