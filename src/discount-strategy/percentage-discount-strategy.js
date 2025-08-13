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
      const totoal = cart.total * (this.percentage / 100);
      if (totoal > 100) {
        return 100;
      }
      return;
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
