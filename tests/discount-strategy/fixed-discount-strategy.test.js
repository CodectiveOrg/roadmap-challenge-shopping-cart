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

    test("calculates correct discount for cart with items", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 1);
      const strategy = new FixedDiscountStrategy(5);
      expect(strategy.calculate(cart)).toBe(5);
    });

    test("calculates correct discount for cart with multiple items", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 2);
      cart.addProduct(new Product("B", 5), 1);
      const strategy = new FixedDiscountStrategy(8);
      expect(strategy.calculate(cart)).toBe(8);
    });

    test("returns amount when cart total is greater than discount amount", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 3);
      const strategy = new FixedDiscountStrategy(5);
      expect(strategy.calculate(cart)).toBe(5);
    });

    test("returns cart total when discount amount is greater than cart total", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 1);
      const strategy = new FixedDiscountStrategy(15);
      expect(strategy.calculate(cart)).toBe(10);
    });

    test("returns zero for empty cart", () => {
      const cart = new Cart();
      const strategy = new FixedDiscountStrategy(5);
      expect(strategy.calculate(cart)).toBe(0);
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
