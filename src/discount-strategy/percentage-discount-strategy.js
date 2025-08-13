import { DiscountStrategy } from "./discount-strategy.js";
import { Cart } from "../cart/cart.js";

export class PercentageDiscountStrategy extends DiscountStrategy {
  #percentage;

  constructor(percentage) {
    super();

    if (
      typeof percentage === "number" &&
      percentage >= 0 &&
      percentage <= 100 &&
      !isNaN(percentage)
    ) {
      this.#percentage = percentage;
    } else {
      throw new Error(`Percentage must be a number from 0 to 100.`);
    }
  }

  calculate(cart) {
    if (!Cart.cartValidation(cart?.product, cart?.quality)) {
      throw new Error(`Cart must be an instance of Cart class.`);
    }

    return 0;
  }
}
