import { DiscountStrategy } from "./discount-strategy.js";
import { Cart } from "../cart/cart.js";
import { PercentageDiscountStrategy } from "./percentage-discount-strategy.js";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();

    if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
      throw new Error("Amount must be a non-negative number.");
    }

    this.#amount = amount;
  }

  calculate(cart) {
    if (cart === null || cart === undefined) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    if (!cart) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    if (!(Object.getPrototypeOf(cart) === Cart.prototype)) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    if (cart.items.length === 0) {
      return 0;
    }

    if (cart.total > this.#amount) {
      return this.#amount;
    }

    if (this.#amount >= cart.total) {
      return cart.total;
    }

    return cart.total - this.#amount;
  }
}
