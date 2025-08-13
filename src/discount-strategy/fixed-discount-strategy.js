import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    if (typeof amount === "number" && amount > 0) {
      this.#amount = amount;
    } else {
      throw new Error("Amount must be a non-negative number.");
    }
  }

  calculate(cart) {
    if (cart instanceof Cart) {
      return;
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
