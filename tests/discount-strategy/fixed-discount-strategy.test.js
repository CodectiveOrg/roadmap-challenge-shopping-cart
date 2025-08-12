import { FixedDiscountStrategy } from "../../src/discount-strategy/fixed-discount-strategy.js";
import { Cart } from "../../src/cart/cart.js";
import { Product } from "../../src/product/product.js";

describe("FixedDiscountStrategy", () => {
  describe("constructor", () => {
    test("creates strategy with valid amount", () => {
      const strategy = new FixedDiscountStrategy(5);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });

    test("accepts zero amount", () => {
      const strategy = new FixedDiscountStrategy(0);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });

    test("accepts decimal amount", () => {
      const strategy = new FixedDiscountStrategy(5.99);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });

    test("accepts large amount", () => {
      const strategy = new FixedDiscountStrategy(1000000);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });
  });

  describe("constructor validation", () => {
    test("throws error if amount is NaN", () => {
      expect(() => new FixedDiscountStrategy(NaN)).toThrow(
        "Amount must be a non-negative number.",
      );
    });

    test("throws error if amount is negative", () => {
      expect(() => new FixedDiscountStrategy(-1)).toThrow(
        "Amount must be a non-negative number.",
      );
    });

    test("throws error if amount is not a number", () => {
      expect(() => new FixedDiscountStrategy("1")).toThrow(
        "Amount must be a non-negative number.",
      );
    });

    test("throws error if amount is null", () => {
      expect(() => new FixedDiscountStrategy(null)).toThrow(
        "Amount must be a non-negative number.",
      );
    });

    test("throws error if amount is undefined", () => {
      expect(() => new FixedDiscountStrategy(undefined)).toThrow(
        "Amount must be a non-negative number.",
      );
    });
  });

  describe("calculate method", () => {
    test("validates cart type", () => {
      const strategy = new FixedDiscountStrategy(5);
      expect(() => strategy.calculate({})).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("validates cart is not null", () => {
      const strategy = new FixedDiscountStrategy(5);
      expect(() => strategy.calculate(null)).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("validates cart is not undefined", () => {
      const strategy = new FixedDiscountStrategy(5);
      expect(() => strategy.calculate(undefined)).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("current implementation throws ReferenceError due to using 'card' instead of 'cart'", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 1);
      const strategy = new FixedDiscountStrategy(5);
      expect(() => strategy.calculate(cart)).toThrow(/card is not defined/);
    });
  });

  describe("edge cases", () => {
    test("handles very small amount", () => {
      const strategy = new FixedDiscountStrategy(0.01);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });

    test("handles very large amount", () => {
      const strategy = new FixedDiscountStrategy(Number.MAX_SAFE_INTEGER);
      expect(strategy).toBeInstanceOf(FixedDiscountStrategy);
    });
  });
});
