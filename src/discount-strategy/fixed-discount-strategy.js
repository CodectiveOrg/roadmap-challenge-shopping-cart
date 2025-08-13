import { DiscountStrategy } from "./discount-strategy";
import { Cart } from "../cart/cart";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();
    if (typeof amount === "number" && !isNaN(amount) && amount >= 0) {
      this.#amount = amount;
    } else {
      throw new Error("Amount must be a non-negative number.");
    }
  }

  calculate(cart) {
    if (cart instanceof Cart) {
      const total = cart.total;

      const discount = total - this.#amount;

      if (discount < total) {
        return discount;
      }
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
