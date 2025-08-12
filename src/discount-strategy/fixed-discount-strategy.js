import { DiscountStrategy } from "./discount-strategy.js";
import { Cart } from "../cart/cart.js";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();

    if (typeof amount !== "number" || Number.isNaN(amount) || amount < 0) {
      throw new Error("Amount must be a non-negative number.");
    }

    this.#amount = amount;
  }

  calculate(cart) {
    if (!(cart instanceof Cart)) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    return Math.min(this.#amount, cart.total);
  }
}
