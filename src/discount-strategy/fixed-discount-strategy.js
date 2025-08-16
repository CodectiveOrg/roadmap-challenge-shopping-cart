import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();
    if (typeof amount !== "number" || amount < 0 || Number.isNaN(amount)) {
      throw new Error("Amount must be a non-negative number.");
    }
    this.#amount = amount;
  }

  calculate(cart) {
    if (!(cart instanceof Cart)) {
      throw new Error("Cart must be an instance of Cart class.");
    }
    // if (cart.total > this.#amount) {
    //   return this.#amount;
    // }
    // if (this.#amount > cart.total) {
    //   return cart.total;
    // }
    return Math.min(cart.total, this.#amount);
  }
}
