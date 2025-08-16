import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";

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
    const discount = cart.total * (this.#percentage / 100);

    // if (discount < cart.total) {
    //   return discount;
    // } else {
    //   return cart.total;
    // }

    return Math.min(cart.total, discount);
  }
}
