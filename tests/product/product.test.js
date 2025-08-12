import { Product } from "../../src/product/product.js";

describe("Product", () => {
  describe("constructor", () => {
    test("creates product with valid name and price", () => {
      const product = new Product("Apple", 1.99);
      expect(product.name).toBe("Apple");
    });

    test("creates product with valid price", () => {
      const product = new Product("Apple", 1.99);
      expect(product.price).toBe(1.99);
    });

    test("trims whitespace from name input", () => {
      const product = new Product("  Apple  ", 2);
      expect(product.name).toBe("Apple");
    });

    test("trims multiple spaces from name input", () => {
      const product = new Product("    Apple    ", 2);
      expect(product.name).toBe("Apple");
    });

    test("trims tabs from name input", () => {
      const product = new Product("\tApple\t", 2);
      expect(product.name).toBe("Apple");
    });

    test("trims newlines from name input", () => {
      const product = new Product("\nApple\n", 2);
      expect(product.name).toBe("Apple");
    });

    test("trims mixed whitespace from name input", () => {
      const product = new Product(" \t \n Apple \n \t ", 2);
      expect(product.name).toBe("Apple");
    });
  });

  describe("validation", () => {
    test("throws error if name is empty string", () => {
      expect(() => new Product("", 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is only spaces", () => {
      expect(() => new Product("   ", 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is only tabs", () => {
      expect(() => new Product("\t\t", 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is only newlines", () => {
      expect(() => new Product("\n\n", 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is not a string", () => {
      expect(() => new Product(123, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is boolean true", () => {
      expect(() => new Product(true, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is boolean false", () => {
      expect(() => new Product(false, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is an empty array", () => {
      expect(() => new Product([], 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is an empty object", () => {
      expect(() => new Product({}, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is null", () => {
      expect(() => new Product(null, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if name is undefined", () => {
      expect(() => new Product(undefined, 1)).toThrow(
        "Name must be a non-empty string.",
      );
    });

    test("throws error if price is NaN", () => {
      expect(() => new Product("Apple", NaN)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is negative", () => {
      expect(() => new Product("Apple", -1)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is very negative", () => {
      expect(() => new Product("Apple", -1000000)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is negative decimal", () => {
      expect(() => new Product("Apple", -0.01)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is not a number", () => {
      expect(() => new Product("Apple", "1")).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is boolean true", () => {
      expect(() => new Product("Apple", true)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is boolean false", () => {
      expect(() => new Product("Apple", false)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is an empty array", () => {
      expect(() => new Product("Apple", [])).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is an empty object", () => {
      expect(() => new Product("Apple", {})).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is null", () => {
      expect(() => new Product("Apple", null)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if price is undefined", () => {
      expect(() => new Product("Apple", undefined)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("throws error if both name and price are invalid", () => {
      expect(() => new Product(null, "invalid")).toThrow(
        "Name must be a non-empty string.",
      );
    });
  });

  describe("edge cases", () => {
    test("accepts zero price", () => {
      const product = new Product("Free Item", 0);
      expect(product.price).toBe(0);
    });

    test("accepts very large price", () => {
      const product = new Product("Expensive Item", 999999.99);
      expect(product.price).toBe(999999.99);
    });

    test("accepts decimal price", () => {
      const product = new Product("Cheap Item", 0.01);
      expect(product.price).toBe(0.01);
    });

    test("accepts very small decimal price", () => {
      const product = new Product("Micro Item", 0.001);
      expect(product.price).toBe(0.001);
    });

    test("accepts integer price", () => {
      const product = new Product("Whole Item", 5);
      expect(product.price).toBe(5);
    });

    test("accepts very long name", () => {
      const longName = "This is a very long product name that exceeds normal length expectations and should still work correctly";
      const product = new Product(longName, 10);
      expect(product.name).toBe(longName);
    });

    test("accepts name with special characters", () => {
      const specialName = "Product!@#$%^&*()_+-=[]{}|;':\",./<>?";
      const product = new Product(specialName, 10);
      expect(product.name).toBe(specialName);
    });

    test("accepts name with numbers", () => {
      const numericName = "Product123";
      const product = new Product(numericName, 10);
      expect(product.name).toBe(numericName);
    });

    test("accepts name with unicode characters", () => {
      const unicodeName = "Produkt café résumé naïve";
      const product = new Product(unicodeName, 10);
      expect(product.name).toBe(unicodeName);
    });

    test("accepts name with emojis", () => {
      const emojiName = "🍎 Apple 🍏";
      const product = new Product(emojiName, 10);
      expect(product.name).toBe(emojiName);
    });

    test("accepts maximum safe integer price", () => {
      const product = new Product("Max Price Item", Number.MAX_SAFE_INTEGER);
      expect(product.price).toBe(Number.MAX_SAFE_INTEGER);
    });

    test("rejects minimum safe integer price as it is negative", () => {
      expect(() => new Product("Min Price Item", Number.MIN_SAFE_INTEGER)).toThrow(
        "Price must be a non-negative number.",
      );
    });

    test("accepts infinity price", () => {
      const product = new Product("Infinite Item", Infinity);
      expect(product.price).toBe(Infinity);
    });

    test("rejects negative infinity price as it is negative", () => {
      expect(() => new Product("Negative Infinite Item", -Infinity)).toThrow(
        "Price must be a non-negative number.",
      );
    });
  });

  describe("getter properties", () => {
    test("name getter returns trimmed name", () => {
      const product = new Product("  Test Product  ", 10);
      expect(product.name).toBe("Test Product");
    });

    test("price getter returns exact price", () => {
      const product = new Product("Test Product", 15.67);
      expect(product.price).toBe(15.67);
    });

    test("getters are read-only", () => {
      const product = new Product("Test Product", 10);
      expect(() => {
        product.name = "New Name";
      }).toThrow();
      expect(() => {
        product.price = 20;
      }).toThrow();
    });
  });

  describe("error message consistency", () => {
    test("name validation error message is consistent", () => {
      try {
        new Product("", 1);
      } catch (error) {
        expect(error.message).toBe("Name must be a non-empty string.");
      }
    });

    test("price validation error message is consistent", () => {
      try {
        new Product("Test", -1);
      } catch (error) {
        expect(error.message).toBe("Price must be a non-negative number.");
      }
    });
  });
});
