import { Cart } from "../../src/cart/cart.js";
import { Product } from "../../src/product/product.js";
import { DiscountStrategy } from "../../src/discount-strategy/discount-strategy.js";

describe("Cart", () => {
  describe("initialization", () => {
    test("starts with empty items array", () => {
      const cart = new Cart();
      expect(Array.isArray(cart.items)).toBe(true);
    });

    test("starts with zero items", () => {
      const cart = new Cart();
      expect(cart.items.length).toBe(0);
    });

    test("starts with zero total", () => {
      const cart = new Cart();
      expect(cart.total).toBe(0);
    });

    test("items array is empty array instance", () => {
      const cart = new Cart();
      expect(cart.items).toEqual([]);
    });

    test("items array is not the same reference as internal array", () => {
      const cart = new Cart();
      const items1 = cart.items;
      const items2 = cart.items;
      expect(items1).not.toBe(items2);
    });

    test("items array contains the same CartItem instances", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      const items = cart.items;
      expect(items[0]).toBe(cart.items[0]);
    });
  });

  describe("addProduct", () => {
    test("adds new product to cart", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      expect(cart.items.length).toBe(1);
    });

    test("sets correct product in cart item", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      expect(cart.items[0].product).toBeInstanceOf(Product);
    });

    test("sets correct quantity in cart item", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      expect(cart.items[0].quantity).toBe(3);
    });

    test("merges quantities for same product name", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Apple", 2);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 4);
      expect(cart.items.length).toBe(1);
    });

    test("combines quantities correctly for same product", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Apple", 2);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 4);
      expect(cart.items[0].quantity).toBe(5);
    });

    test("uses default quantity of 1 when not specified", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product);
      expect(cart.items[0].quantity).toBe(1);
    });

    test("adds multiple different products", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      cart.addProduct(product1, 3);
      cart.addProduct(product2, 2);
      expect(cart.items.length).toBe(2);
    });

    test("maintains product order when adding different products", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      expect(cart.items[0].product.name).toBe("Apple");
      expect(cart.items[1].product.name).toBe("Banana");
    });

    test("adds product with very large quantity", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 1000000);
      expect(cart.items[0].quantity).toBe(1000000);
    });

    test("adds product with quantity of 1", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 1);
      expect(cart.items[0].quantity).toBe(1);
    });

    test("adds product with decimal price", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2.99);
      cart.addProduct(product, 2);
      expect(cart.items[0].product.price).toBe(2.99);
    });

    test("adds product with zero price", () => {
      const cart = new Cart();
      const product = new Product("Free Apple", 0);
      cart.addProduct(product, 5);
      expect(cart.items[0].product.price).toBe(0);
    });

    test("adds product with very large price", () => {
      const cart = new Cart();
      const product = new Product("Expensive Apple", 999999.99);
      cart.addProduct(product, 1);
      expect(cart.items[0].product.price).toBe(999999.99);
    });
  });

  describe("addProduct validation", () => {
    test("throws error if product is not Product instance", () => {
      const cart = new Cart();
      expect(() => cart.addProduct({}, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is null", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(null, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is undefined", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(undefined, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean true", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(true, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean false", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(false, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty array", () => {
      const cart = new Cart();
      expect(() => cart.addProduct([], 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty object", () => {
      const cart = new Cart();
      expect(() => cart.addProduct({}, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a string", () => {
      const cart = new Cart();
      expect(() => cart.addProduct("not a product", 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a number", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(123, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if quantity is zero", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, 0)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is negative", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, -1)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is very negative", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, -1000000)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is decimal", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, 1.2)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is null", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, null)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("uses default quantity of 1 when quantity is undefined", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, undefined);
      expect(cart.items[0].quantity).toBe(1);
    });

    test("throws error if quantity is boolean true", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, true)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is boolean false", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, false)).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is an empty array", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, [])).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is an empty object", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, {})).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is a string", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, "1")).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is a negative string", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, "-1")).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if quantity is a decimal string", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      expect(() => cart.addProduct(product, "1.5")).toThrow(
        "Quantity must be a positive integer",
      );
    });

    test("throws error if both product and quantity are invalid", () => {
      const cart = new Cart();
      expect(() => cart.addProduct(null, "invalid")).toThrow(
        "Product must be an instance of Product class.",
      );
    });
  });

  describe("removeProduct", () => {
    test("removes product by name match", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 3);
      cart.removeProduct(new Product("Apple", 2));
      expect(cart.items.length).toBe(1);
    });

    test("keeps remaining products after removal", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 3);
      cart.removeProduct(new Product("Apple", 2));
      expect(cart.items[0].product.name).toBe("Banana");
    });

    test("removes all items with same product name", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Apple", 3);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      cart.removeProduct(new Product("Apple", 2));
      expect(cart.items.length).toBe(0);
    });

    test("removes product with different price but same name", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Apple", 5);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      cart.removeProduct(new Product("Apple", 10));
      expect(cart.items.length).toBe(0);
    });

    test("removes product with different quantity but same name", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      cart.addProduct(product1, 5);
      cart.removeProduct(new Product("Apple", 2));
      expect(cart.items.length).toBe(0);
    });

    test("removes product from empty cart", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.removeProduct(product);
      expect(cart.items.length).toBe(0);
    });

    test("removes product from single item cart", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 1);
      cart.removeProduct(product);
      expect(cart.items.length).toBe(0);
    });

    test("removes product from multiple items cart", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      const product3 = new Product("Orange", 3);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      cart.addProduct(product3, 1);
      cart.removeProduct(product2);
      expect(cart.items.length).toBe(2);
      expect(cart.items[0].product.name).toBe("Apple");
      expect(cart.items[1].product.name).toBe("Orange");
    });
  });

  describe("removeProduct validation", () => {
    test("throws error if product is not Product instance", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct({})).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is null", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct(null)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is undefined", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct(undefined)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean true", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct(true)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean false", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct(false)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty array", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct([])).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty object", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct({})).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a string", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct("not a product")).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a number", () => {
      const cart = new Cart();
      expect(() => cart.removeProduct(123)).toThrow(
        "Product must be an instance of Product class.",
      );
    });
  });

  describe("applyDiscount", () => {
    test("validates strategy instance", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount({})).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not null", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount(null)).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not undefined", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount(undefined)).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not boolean true", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount(true)).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not boolean false", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount(false)).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not an empty array", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount([])).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not an empty object", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount({})).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not a string", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount("not a strategy")).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates strategy is not a number", () => {
      const cart = new Cart();
      expect(() => cart.applyDiscount(123)).toThrow(
        "Strategy must be an instance of DiscountStrategy subclass.",
      );
    });

    test("validates discount return value is not negative", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return -5;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not NaN", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return NaN;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is a number", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return "not a number";
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not null", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return null;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not undefined", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return undefined;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not boolean", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return true;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not an array", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return [];
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("validates discount return value is not an object", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return {};
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      expect(() => cart.applyDiscount(bad)).toThrow(
        "Discount must be a non-negative number.",
      );
    });

    test("never returns negative total after discount", () => {
      class GreedyStrategy extends DiscountStrategy {
        calculate(cart) {
          return cart.total + 1000;
        }
      }
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 20;
        },
      };
      const strategy = new GreedyStrategy();
      expect(Cart.prototype.applyDiscount.call(proxyCart, strategy)).toBe(0);
    });

    test("applies zero discount correctly", () => {
      class ZeroStrategy extends DiscountStrategy {
        calculate(cart) {
          return 0;
        }
      }
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 20;
        },
      };
      const strategy = new ZeroStrategy();
      expect(Cart.prototype.applyDiscount.call(proxyCart, strategy)).toBe(20);
    });

    test("applies partial discount correctly", () => {
      class PartialStrategy extends DiscountStrategy {
        calculate(cart) {
          return 5;
        }
      }
      const cart = new Cart();
      cart.addProduct(new Product("A", 10), 2);
      const proxyCart = {
        __proto__: cart,
        get total() {
          return 20;
        },
      };
      const strategy = new PartialStrategy();
      expect(Cart.prototype.applyDiscount.call(proxyCart, strategy)).toBe(15);
    });
  });

  describe("edge cases", () => {
    test("handles empty cart operations", () => {
      const cart = new Cart();
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });

    test("handles single item cart", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 1);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.name).toBe("Apple");
    });

    test("handles multiple different products", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      const product3 = new Product("Orange", 3);
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 3);
      cart.addProduct(product3, 1);
      expect(cart.items.length).toBe(3);
    });

    test("handles cart with many products", () => {
      const cart = new Cart();
      for (let i = 0; i < 100; i++) {
        const product = new Product(`Product${i}`, i);
        cart.addProduct(product, 1);
      }
      expect(cart.items.length).toBe(100);
    });

    test("handles cart with very large quantities", () => {
      const cart = new Cart();
      const product = new Product("Apple", 0.01);
      cart.addProduct(product, 1000000);
      expect(cart.items[0].quantity).toBe(1000000);
    });

    test("handles cart with very expensive products", () => {
      const cart = new Cart();
      const product = new Product("Diamond", 999999.99);
      cart.addProduct(product, 1);
      expect(cart.items[0].product.price).toBe(999999.99);
    });

    test("handles cart with free products", () => {
      const cart = new Cart();
      const product = new Product("Free Item", 0);
      cart.addProduct(product, 10);
      expect(cart.items[0].product.price).toBe(0);
    });

    test("handles cart with decimal prices", () => {
      const cart = new Cart();
      const product = new Product("Precise Item", 3.14159);
      cart.addProduct(product, 2);
      expect(cart.items[0].product.price).toBe(3.14159);
    });

    test("handles cart with mixed product types", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1.5);
      const product3 = new Product("Orange", 3.25);
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 3);
      cart.addProduct(product3, 1);
      expect(cart.items.length).toBe(3);
      expect(cart.items[0].product.name).toBe("Apple");
      expect(cart.items[1].product.name).toBe("Banana");
      expect(cart.items[2].product.name).toBe("Orange");
    });

    test("handles cart with same product added multiple times", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 1);
      cart.addProduct(product, 2);
      cart.addProduct(product, 3);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(6);
    });

    test("handles cart with products having same name but different prices", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Apple", 3);
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
      // Note: The current implementation uses the first product's price
      expect(cart.items[0].product.price).toBe(2);
    });
  });

  describe("getter properties", () => {
    test("items getter returns array", () => {
      const cart = new Cart();
      expect(Array.isArray(cart.items)).toBe(true);
    });

    test("items getter returns empty array for new cart", () => {
      const cart = new Cart();
      expect(cart.items).toEqual([]);
    });

    test("items getter returns correct items after adding products", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].product.name).toBe("Apple");
      expect(cart.items[0].quantity).toBe(3);
    });

    test("total getter returns zero for empty cart", () => {
      const cart = new Cart();
      expect(cart.total).toBe(0);
    });

    test("total getter returns correct total for single item", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      cart.addProduct(product, 3);
      expect(cart.total).toBe(6);
    });

    test("total getter returns correct total for multiple items", () => {
      const cart = new Cart();
      const product1 = new Product("Apple", 2);
      const product2 = new Product("Banana", 1);
      cart.addProduct(product1, 3);
      cart.addProduct(product2, 2);
      expect(cart.total).toBe(8);
    });

    test("getters are read-only", () => {
      const cart = new Cart();
      expect(() => {
        cart.items = [];
      }).toThrow();
      expect(() => {
        cart.total = 100;
      }).toThrow();
    });
  });

  describe("error message consistency", () => {
    test("addProduct product validation error message is consistent", () => {
      const cart = new Cart();
      try {
        cart.addProduct({}, 1);
      } catch (error) {
        expect(error.message).toBe(
          "Product must be an instance of Product class.",
        );
      }
    });

    test("addProduct quantity validation error message is consistent", () => {
      const cart = new Cart();
      const product = new Product("Apple", 2);
      try {
        cart.addProduct(product, 0);
      } catch (error) {
        expect(error.message).toBe("Quantity must be a positive integer.");
      }
    });

    test("removeProduct validation error message is consistent", () => {
      const cart = new Cart();
      try {
        cart.removeProduct({});
      } catch (error) {
        expect(error.message).toBe(
          "Product must be an instance of Product class.",
        );
      }
    });

    test("applyDiscount strategy validation error message is consistent", () => {
      const cart = new Cart();
      try {
        cart.applyDiscount({});
      } catch (error) {
        expect(error.message).toBe(
          "Strategy must be an instance of DiscountStrategy subclass.",
        );
      }
    });

    test("applyDiscount discount validation error message is consistent", () => {
      class BadStrategy extends DiscountStrategy {
        calculate() {
          return -5;
        }
      }
      const cart = new Cart();
      const product = new Product("A", 10);
      cart.addProduct(product, 1);
      const bad = new BadStrategy();
      try {
        cart.applyDiscount(bad);
      } catch (error) {
        expect(error.message).toBe("Discount must be a non-negative number.");
      }
    });
  });
});
