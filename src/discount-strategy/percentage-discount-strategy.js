import { DiscountStrategy } from "./discount-strategy";
import { Cart } from "../cart/cart";

export class PercentageDiscountStrategy extends DiscountStrategy {
  #percentage;

  constructor(percentage) {
    super();

    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      this.#percentage = percentage;
    } else {
      throw new Error("Percentage must be a number from 0 to 100.");
    }
  }

  calculate(cart) {
    if (cart instanceof Cart) {
      const total = cart.total();

      const afterDiscount = total - total * this.#percentage;

      if (afterDiscount < total) {
        return afterDiscount;
      }
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
