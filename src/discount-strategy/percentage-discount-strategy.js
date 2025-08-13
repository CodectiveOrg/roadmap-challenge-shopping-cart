import { DiscountStrategy } from "./discount-strategy.js";
import { Cart } from "../cart/cart.js";

export class PercentageDiscountStrategy extends DiscountStrategy {
  #percentage;

  constructor(percentage) {
    super();

    if (
      typeof percentage !== "number" ||
      isNaN(percentage) ||
      !(percentage >= 0 && percentage <= 100)
    ) {
      throw new Error("Percentage must be a number from 0 to 100.");
    }

    this.#percentage = percentage;
  }

  calculate(cart) {
    if (cart === null || cart === undefined) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    if (!cart) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    if (!(cart instanceof Cart)) {
      throw new Error("Cart must be an instance of Cart class.");
    }

    const cartTotalPrices = cart.total;
    const discountAmount = cartTotalPrices * (this.#percentage / 100);

    if (discountAmount <= cartTotalPrices) {
      return discountAmount;
    }
  }
}
