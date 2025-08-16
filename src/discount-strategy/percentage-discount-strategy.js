import { Cart } from "../cart/cart.js";
import { DiscountStrategy } from "./discount-strategy.js";

export class PercentageDiscountStrategy extends DiscountStrategy {
  #percentage;

  constructor(percentage) {
    super();

    if (
      typeof percentage !== "number" ||
      Number.isNaN(percentage) ||
      percentage < 0 ||
      100 < percentage
    ) {
      throw new Error("Percentage must be a number from 0 to 100.");
    }

    this.#percentage = percentage;
  }

  calculate(cart) {
    if (!(cart instanceof Cart)) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    return Math.min(cart.total, cart.total * (this.#percentage / 100));
  }
}
