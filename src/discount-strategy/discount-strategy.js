export class DiscountStrategy {
  constructor() {
    throw new Error(
      `DiscountStrategy is abstract and cannot be used directly.`,
    );
  }

  calculate(cart) {
    throw new Error(`Subclasses must implement calculate method.`);
  }
}
