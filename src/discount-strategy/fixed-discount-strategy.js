import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();
    if (typeof amount === "number" && amount >= 0) {
      this.#amount = amount;
    } else {
      throw new Error("Amount must be a non-negative number.");
    }
  }

  calculate(cart) {
    if (cart instanceof Cart) {
      if (cart.items.length === 0) {
        return 0;
      }
      if (cart.total > this.#amount) {
        return this.#amount;
      }
      if (this.#amount > cart.total) {
        return cart.total;
      }
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
