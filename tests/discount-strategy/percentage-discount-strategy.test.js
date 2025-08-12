import { PercentageDiscountStrategy } from "../../src/discount-strategy/percentage-discount-strategy.js";
import { Cart } from "../../src/cart/cart.js";
import { Product } from "../../src/product/product.js";

describe("PercentageDiscountStrategy", () => {
  describe("constructor", () => {
    test("creates strategy with valid percentage", () => {
      const strategy = new PercentageDiscountStrategy(10);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("accepts zero percentage", () => {
      const strategy = new PercentageDiscountStrategy(0);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("accepts 100 percentage", () => {
      const strategy = new PercentageDiscountStrategy(100);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("accepts decimal percentage", () => {
      const strategy = new PercentageDiscountStrategy(25.5);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });
  });

  describe("constructor validation", () => {
    test("throws error if percentage is NaN", () => {
      expect(() => new PercentageDiscountStrategy(NaN)).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });

    test("throws error if percentage is negative", () => {
      expect(() => new PercentageDiscountStrategy(-1)).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });

    test("throws error if percentage is greater than 100", () => {
      expect(() => new PercentageDiscountStrategy(101)).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });

    test("throws error if percentage is not a number", () => {
      expect(() => new PercentageDiscountStrategy("10")).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });

    test("throws error if percentage is null", () => {
      expect(() => new PercentageDiscountStrategy(null)).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });

    test("throws error if percentage is undefined", () => {
      expect(() => new PercentageDiscountStrategy(undefined)).toThrow(
        "Percentage must be a number from 0 to 100.",
      );
    });
  });

  describe("calculate method", () => {
    test("validates cart type", () => {
      const strategy = new PercentageDiscountStrategy(10);
      expect(() => strategy.calculate({})).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("validates cart is not null", () => {
      const strategy = new PercentageDiscountStrategy(10);
      expect(() => strategy.calculate(null)).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("validates cart is not undefined", () => {
      const strategy = new PercentageDiscountStrategy(10);
      expect(() => strategy.calculate(undefined)).toThrow(
        "Cart must be an instance of Cart class.",
      );
    });

    test("calculates 10% discount correctly", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 3);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 30;
        },
      };
      const strategy = new PercentageDiscountStrategy(10);
      expect(strategy.calculate(proxyCart)).toBe(3);
    });

    test("calculates 25% discount correctly", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 4);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 40;
        },
      };
      const strategy = new PercentageDiscountStrategy(25);
      expect(strategy.calculate(proxyCart)).toBe(10);
    });

    test("0% yields zero discount", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 5), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 10;
        },
      };
      expect(new PercentageDiscountStrategy(0).calculate(proxyCart)).toBe(0);
    });

    test("100% yields full total as discount", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 5), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 10;
        },
      };
      expect(new PercentageDiscountStrategy(100).calculate(proxyCart)).toBe(10);
    });

    test("50% yields half total as discount", () => {
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 20;
        },
      };
      expect(new PercentageDiscountStrategy(50).calculate(proxyCart)).toBe(10);
    });
  });

  describe("edge cases", () => {
    test("handles very small percentage", () => {
      const strategy = new PercentageDiscountStrategy(0.01);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("handles percentage just under 100", () => {
      const strategy = new PercentageDiscountStrategy(99.99);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("handles percentage just above 0", () => {
      const strategy = new PercentageDiscountStrategy(0.01);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });

    test("handles percentage just under 100", () => {
      const strategy = new PercentageDiscountStrategy(99.99);
      expect(strategy).toBeInstanceOf(PercentageDiscountStrategy);
    });
  });
});
