import { CartItem } from "../../src/cart/cart-item.js";
import { Product } from "../../src/product/product.js";

describe("CartItem", () => {
  describe("constructor", () => {
    test("creates cart item with valid product", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 3);
      expect(cartItem.product).toBe(product);
    });

    test("creates cart item with valid quantity", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 3);
      expect(cartItem.quantity).toBe(3);
    });

    test("calculates correct subtotal", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 3);
      expect(cartItem.subtotal).toBe(6);
    });

    test("creates cart item with quantity of 1", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 1);
      expect(cartItem.quantity).toBe(1);
      expect(cartItem.subtotal).toBe(2);
    });

    test("creates cart item with large quantity", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 1000000);
      expect(cartItem.quantity).toBe(1000000);
      expect(cartItem.subtotal).toBe(2000000);
    });
  });

  describe("validation", () => {
    test("throws error if product is not Product instance", () => {
      expect(() => new CartItem({}, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is null", () => {
      expect(() => new CartItem(null, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is undefined", () => {
      expect(() => new CartItem(undefined, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean true", () => {
      expect(() => new CartItem(true, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is boolean false", () => {
      expect(() => new CartItem(false, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty array", () => {
      expect(() => new CartItem([], 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is an empty object", () => {
      expect(() => new CartItem({}, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a string", () => {
      expect(() => new CartItem("not a product", 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if product is a number", () => {
      expect(() => new CartItem(123, 1)).toThrow(
        "Product must be an instance of Product class.",
      );
    });

    test("throws error if quantity is not integer", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, 1.5)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is zero", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, 0)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is negative", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, -2)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is very negative", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, -1000000)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is null", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, null)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is undefined", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, undefined)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is boolean true", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, true)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is boolean false", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, false)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is an empty array", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, [])).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is an empty object", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, {})).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is a string", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, "1")).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is a decimal string", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, "1.5")).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if quantity is a negative string", () => {
      const product = new Product("Apple", 2);
      expect(() => new CartItem(product, "-1")).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error if both product and quantity are invalid", () => {
      expect(() => new CartItem(null, "invalid")).toThrow(
        "Product must be an instance of Product class.",
      );
    });
  });

  describe("quantity setter", () => {
    test("updates quantity to valid positive integer", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      cartItem.quantity = 5;
      expect(cartItem.quantity).toBe(5);
    });

    test("recalculates subtotal after quantity change", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      cartItem.quantity = 5;
      expect(cartItem.subtotal).toBe(5);
    });

    test("updates quantity to 1", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      cartItem.quantity = 1;
      expect(cartItem.quantity).toBe(1);
      expect(cartItem.subtotal).toBe(1);
    });

    test("updates quantity to large number", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      cartItem.quantity = 999999;
      expect(cartItem.quantity).toBe(999999);
      expect(cartItem.subtotal).toBe(999999);
    });

    test("throws error when setting quantity to zero", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = 0)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to negative", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = -1)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to very negative", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = -1000000)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to decimal", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = 1.5)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to null", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = null)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to undefined", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = undefined)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to boolean true", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = true)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to boolean false", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = false)).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to empty array", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = [])).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to empty object", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = {})).toThrow(
        "Quantity must be a positive integer.",
      );
    });

    test("throws error when setting quantity to string", () => {
      const product = new Product("Banana", 1);
      const cartItem = new CartItem(product, 2);
      expect(() => (cartItem.quantity = "5")).toThrow(
        "Quantity must be a positive integer.",
      );
    });
  });

  describe("edge cases", () => {
    test("handles quantity of 1", () => {
      const product = new Product("Apple", 2);
      const cartItem = new CartItem(product, 1);
      expect(cartItem.quantity).toBe(1);
      expect(cartItem.subtotal).toBe(2);
    });

    test("handles very large quantity", () => {
      const product = new Product("Apple", 0.01);
      const cartItem = new CartItem(product, 1000000);
      expect(cartItem.quantity).toBe(1000000);
      expect(cartItem.subtotal).toBe(10000);
    });

    test("handles zero price product", () => {
      const product = new Product("Free Item", 0);
      const cartItem = new CartItem(product, 5);
      expect(cartItem.subtotal).toBe(0);
    });

    test("handles very small price product", () => {
      const product = new Product("Micro Item", 0.001);
      const cartItem = new CartItem(product, 1000);
      expect(cartItem.subtotal).toBe(1);
    });

    test("handles very large price product", () => {
      const product = new Product("Expensive Item", 1000000);
      const cartItem = new CartItem(product, 1);
      expect(cartItem.subtotal).toBe(1000000);
    });

    test("handles decimal price product", () => {
      const product = new Product("Decimal Item", 3.14);
      const cartItem = new CartItem(product, 2);
      expect(cartItem.subtotal).toBe(6.28);
    });

    test("handles maximum safe integer quantity", () => {
      const product = new Product("Max Item", 1);
      const cartItem = new CartItem(product, Number.MAX_SAFE_INTEGER);
      expect(cartItem.quantity).toBe(Number.MAX_SAFE_INTEGER);
      expect(cartItem.subtotal).toBe(Number.MAX_SAFE_INTEGER);
    });

    test("rejects minimum safe integer quantity as it is negative", () => {
      const product = new Product("Min Item", 1);
      expect(() => new CartItem(product, Number.MIN_SAFE_INTEGER)).toThrow(
        "Quantity must be a positive integer.",
      );
    });
  });

  describe("getter properties", () => {
    test("product getter returns the correct product", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 2);
      expect(cartItem.product).toBe(product);
      expect(cartItem.product.name).toBe("Test Product");
      expect(cartItem.product.price).toBe(10);
    });

    test("quantity getter returns the correct quantity", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 5);
      expect(cartItem.quantity).toBe(5);
    });

    test("subtotal getter calculates correctly", () => {
      const product = new Product("Test Product", 7.5);
      const cartItem = new CartItem(product, 3);
      expect(cartItem.subtotal).toBe(22.5);
    });

    test("product getter is read-only", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 2);
      expect(() => {
        cartItem.product = new Product("New Product", 20);
      }).toThrow();
    });

    test("quantity setter works correctly", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 2);
      cartItem.quantity = 10;
      expect(cartItem.quantity).toBe(10);
    });

    test("subtotal getter is read-only", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 2);
      expect(() => {
        cartItem.subtotal = 100;
      }).toThrow();
    });
  });

  describe("error message consistency", () => {
    test("product validation error message is consistent", () => {
      try {
        new CartItem({}, 1);
      } catch (error) {
        expect(error.message).toBe("Product must be an instance of Product class.");
      }
    });

    test("quantity validation error message is consistent", () => {
      const product = new Product("Test Product", 10);
      try {
        new CartItem(product, 0);
      } catch (error) {
        expect(error.message).toBe("Quantity must be a positive integer.");
      }
    });

    test("setter validation error message is consistent", () => {
      const product = new Product("Test Product", 10);
      const cartItem = new CartItem(product, 2);
      try {
        cartItem.quantity = 0;
      } catch (error) {
        expect(error.message).toBe("Quantity must be a positive integer.");
      }
    });
  });

  describe("mathematical operations", () => {
    test("subtotal calculation with zero price", () => {
      const product = new Product("Free Item", 0);
      const cartItem = new CartItem(product, 100);
      expect(cartItem.subtotal).toBe(0);
    });

    test("subtotal calculation with one quantity", () => {
      const product = new Product("Single Item", 5.99);
      const cartItem = new CartItem(product, 1);
      expect(cartItem.subtotal).toBe(5.99);
    });

    test("subtotal calculation with large numbers", () => {
      const product = new Product("Large Item", 999999.99);
      const cartItem = new CartItem(product, 999);
      expect(cartItem.subtotal).toBe(999999.99 * 999);
    });

    test("subtotal calculation with decimal precision", () => {
      const product = new Product("Precise Item", 0.33);
      const cartItem = new CartItem(product, 3);
      expect(cartItem.subtotal).toBe(0.99);
    });
  });
});
