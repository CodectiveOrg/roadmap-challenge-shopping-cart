import { Cart } from "../cart/cart";
import { DiscountStrategy } from "./discount-strategy";
import { PercentageDiscountStrategy } from "./percentage-discount-strategy";

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
      if (cart.items.length > 0 && cart.total > this.#amount) {
        const presentageDiscount = new PercentageDiscountStrategy(cart.total);
        const res = cart.total - presentageDiscount.total;
        return res;
      }
    } else {
      throw new Error("Cart must be an instance of Cart class.");
    }
  }
}
