export class DiscountStrategy {
  constructor() {
    if (new.target === DiscountStrategy) {
      throw new Error(
        "DiscountStrategy is abstract and cannot be used directly."
      );
    }
  }

  calculate() {
    throw new Error("Subclasses must implement calculate method.");
  }
}
