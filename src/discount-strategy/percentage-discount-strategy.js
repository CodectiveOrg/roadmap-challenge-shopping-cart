import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";

export class PercentageDiscountStrategy extends DiscountStrategy {
  #percentage;
  constructor(percentage) {
    super();
    if (
      typeof percentage === "number" &&
      percentage >= 0 &&
      percentage <= 100
    ) {
      this.#percentage = percentage;
    } else {
      throw new Error("Percentage must be a number from 0 to 100.");
    }
  }

  calculate(cart) {
    if (cart instanceof Cart) {
      if (this.#percentage < cart.total) {
        const discount = cart.total * (this.percentage / 100);
        return discount;
      } else if (this.#percentage > cart.total) {
        return 100;
      }
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
