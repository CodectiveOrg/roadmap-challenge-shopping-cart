import { DiscountStrategy } from "../../src/discount-strategy/discount-strategy.js";

describe("DiscountStrategy (abstract base)", () => {
  describe("instantiation", () => {
    test("cannot instantiate directly", () => {
      expect(() => new DiscountStrategy()).toThrow(
        "DiscountStrategy is abstract and cannot be used directly.",
      );
    });

    test("constructor exists but cannot be called", () => {
      expect(typeof DiscountStrategy).toBe("function");
      expect(() => new DiscountStrategy()).toThrow();
    });

    test("prototype has calculate method", () => {
      expect(typeof DiscountStrategy.prototype.calculate).toBe("function");
    });
  });

  describe("calculate method", () => {
    test("calculate must be implemented by subclasses", () => {
      class NoopStrategy extends DiscountStrategy {}
      const strategy = new NoopStrategy();
      expect(() => strategy.calculate({})).toThrow(
        "Subclasses must implement calculate method.",
      );
    });

    test("calculate method exists on subclass instances", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 10;
        }
      }
      const strategy = new TestStrategy();
      expect(typeof strategy.calculate).toBe("function");
    });

    test("calculate method can be called on subclass instances", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 25;
        }
      }
      const strategy = new TestStrategy();
      const result = strategy.calculate({});
      expect(result).toBe(25);
    });

    test("calculate method receives cart parameter", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return cart.total || 0;
        }
      }
      const strategy = new TestStrategy();
      const mockCart = { total: 100 };
      const result = strategy.calculate(mockCart);
      expect(result).toBe(100);
    });

    test("calculate method can return zero", () => {
      class ZeroStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const strategy = new ZeroStrategy();
      const result = strategy.calculate({});
      expect(result).toBe(0);
    });

    test("calculate method can return large numbers", () => {
      class LargeStrategy extends DiscountStrategy {
        calculate(cart) {
          return 999999.99;
        }
      }
      const strategy = new LargeStrategy();
      const result = strategy.calculate({});
      expect(result).toBe(999999.99);
    });

    test("calculate method can return decimal numbers", () => {
      class DecimalStrategy extends DiscountStrategy {
        calculate(cart) {
          return 3.14159;
        }
      }
      const strategy = new DecimalStrategy();
      const result = strategy.calculate({});
      expect(result).toBe(3.14159);
    });

    test("calculate method can access cart properties", () => {
      class PropertyStrategy extends DiscountStrategy {
        calculate(cart) {
          return cart.items ? cart.items.length : 0;
        }
      }
      const strategy = new PropertyStrategy();
      const mockCart = { items: [1, 2, 3] };
      const result = strategy.calculate(mockCart);
      expect(result).toBe(3);
    });

    test("calculate method can perform calculations", () => {
      class MathStrategy extends DiscountStrategy {
        calculate(cart) {
          return (cart.total || 0) * 0.1;
        }
      }
      const strategy = new MathStrategy();
      const mockCart = { total: 50 };
      const result = strategy.calculate(mockCart);
      expect(result).toBe(5);
    });
  });

  describe("inheritance", () => {
    test("subclass can extend DiscountStrategy", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const strategy = new TestStrategy();
      expect(strategy).toBeInstanceOf(DiscountStrategy);
    });

    test("subclass can override calculate method", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 50;
        }
      }
      const strategy = new TestStrategy();
      expect(strategy.calculate({})).toBe(50);
    });

    test("subclass can have additional methods", () => {
      class ExtendedStrategy extends DiscountStrategy {
        constructor() {
          super();
          this.factor = 0.2;
        }
        
        calculate(cart) {
          return (cart.total || 0) * this.factor;
        }
        
        setFactor(factor) {
          this.factor = factor;
        }
      }
      const strategy = new ExtendedStrategy();
      expect(typeof strategy.setFactor).toBe("function");
      expect(strategy.factor).toBe(0.2);
    });

    test("subclass can have additional properties", () => {
      class PropertyStrategy extends DiscountStrategy {
        constructor() {
          super();
          this.name = "Test Strategy";
          this.enabled = true;
        }
        
        calculate(cart) {
          return this.enabled ? 10 : 0;
        }
      }
      const strategy = new PropertyStrategy();
      expect(strategy.name).toBe("Test Strategy");
      expect(strategy.enabled).toBe(true);
    });

    test("subclass can implement conditional logic", () => {
      class ConditionalStrategy extends DiscountStrategy {
        calculate(cart) {
          if (!cart || !cart.total) return 0;
          if (cart.total > 100) return 20;
          if (cart.total > 50) return 10;
          return 5;
        }
      }
      const strategy = new ConditionalStrategy();
      expect(strategy.calculate({ total: 25 })).toBe(5);
      expect(strategy.calculate({ total: 75 })).toBe(10);
      expect(strategy.calculate({ total: 150 })).toBe(20);
      expect(strategy.calculate({})).toBe(0);
    });

    test("subclass can handle edge cases", () => {
      class EdgeCaseStrategy extends DiscountStrategy {
        calculate(cart) {
          if (!cart) return 0;
          if (cart.total === 0) return 0;
          if (cart.total < 0) return 0;
          if (cart.total === Infinity) return 0;
          if (cart.total === -Infinity) return 0;
          if (Number.isNaN(cart.total)) return 0;
          return Math.min(cart.total, 50);
        }
      }
      const strategy = new EdgeCaseStrategy();
      expect(strategy.calculate({ total: 0 })).toBe(0);
      expect(strategy.calculate({ total: -10 })).toBe(0);
      expect(strategy.calculate({ total: Infinity })).toBe(0);
      expect(strategy.calculate({ total: -Infinity })).toBe(0);
      expect(strategy.calculate({ total: NaN })).toBe(0);
      expect(strategy.calculate({ total: 25 })).toBe(25);
      expect(strategy.calculate({ total: 100 })).toBe(50);
    });
  });

  describe("error handling", () => {
    test("abstract class error message is consistent", () => {
      try {
        new DiscountStrategy();
      } catch (error) {
        expect(error.message).toBe("DiscountStrategy is abstract and cannot be used directly.");
      }
    });

    test("calculate method error message is consistent", () => {
      class NoopStrategy extends DiscountStrategy {}
      const strategy = new NoopStrategy();
      try {
        strategy.calculate({});
      } catch (error) {
        expect(error.message).toBe("Subclasses must implement calculate method.");
      }
    });

    test("error messages are descriptive", () => {
      expect(() => new DiscountStrategy()).toThrow(/abstract/);
      expect(() => new DiscountStrategy()).toThrow(/cannot be used directly/);
      
      class NoopStrategy extends DiscountStrategy {}
      const strategy = new NoopStrategy();
      expect(() => strategy.calculate({})).toThrow(/Subclasses must implement/);
      expect(() => strategy.calculate({})).toThrow(/calculate method/);
    });
  });

  describe("type checking", () => {
    test("instanceof works correctly", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const strategy = new TestStrategy();
      expect(strategy instanceof DiscountStrategy).toBe(true);
      expect(strategy instanceof TestStrategy).toBe(true);
      expect(strategy instanceof Object).toBe(true);
    });

    test("constructor property points to subclass", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const strategy = new TestStrategy();
      expect(strategy.constructor).toBe(TestStrategy);
      expect(strategy.constructor.name).toBe("TestStrategy");
    });

    test("prototype chain is correct", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const strategy = new TestStrategy();
      expect(Object.getPrototypeOf(strategy)).toBe(TestStrategy.prototype);
      expect(Object.getPrototypeOf(TestStrategy.prototype)).toBe(DiscountStrategy.prototype);
      expect(Object.getPrototypeOf(DiscountStrategy.prototype)).toBe(Object.prototype);
    });
  });

  describe("method binding", () => {
    test("calculate method is bound to instance", () => {
      class TestStrategy extends DiscountStrategy {
        constructor() {
          super();
          this.value = 42;
        }
        
        calculate(cart) {
          return this.value;
        }
      }
      const strategy = new TestStrategy();
      const boundCalculate = strategy.calculate.bind(strategy);
      expect(boundCalculate({})).toBe(42);
    });

    test("calculate method can be called with different contexts", () => {
      class TestStrategy extends DiscountStrategy {
        calculate(cart) {
          return this.factor || 1;
        }
      }
      const strategy = new TestStrategy();
      const context1 = { factor: 2 };
      const context2 = { factor: 3 };
      
      expect(strategy.calculate.call(context1, {})).toBe(2);
      expect(strategy.calculate.call(context2, {})).toBe(3);
    });
  });
});
