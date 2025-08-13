import { DiscountStrategy } from "./discount-strategy.js";
import { Cart } from "../cart/cart.js";

export class FixedDiscountStrategy extends DiscountStrategy {
  #amount;

  constructor(amount) {
    super();

    if (typeof amount === "number" && amount >= 0 && !isNaN(amount)) {
      this.#amount = amount;
    }
  }

  calculate(cart) {
    if (!Cart.cartValidation(cart?.product, cart?.quality)) {
      throw new Error(`Cart must be an instance of Cart class.`);
    }

    return 0;
    //discount
  }
}
