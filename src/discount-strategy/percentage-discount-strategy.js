import { DiscountStrategy } from "./discount-strategy";

export class PercentageDiscountStrategy extends DiscountStrategy {
  constructor() {
    super();
    if (new.target === DiscountStrategy) {
      return calculate(cart);
    } else {
      throw new Error("Subclasses must implement calculate method.");
    }
  }
}
