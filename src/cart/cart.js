import { Product } from "../product/product";
import { CartItem } from "./cart-item";
import { DiscountStrategy } from "../discount-strategy/discount-strategy";

export class Cart {
  #items = [];

  constructor() {}

  get items() {
    return [...this.#items];
  }

  get total() {
    if (this.#items.length > 1) {
      console.log(this.#items.reduce((acc, item) => acc + item.subtotal, 0));

      return this.#items.reduce((acc, item) => acc + item.subtotal, 0);
    }
    if (this.#items.length === 1) {
      return this.#items.reduce((acc, item) => acc + item.subtotal, 0);
    }
    if (this.#items.length === 0) {
      return 0;
    }
  }

  addProduct(product, quantity = 1) {
    if (product instanceof Product) {
      if (Number.isInteger(quantity) && quantity > 0) {
        if (this.#items.map((item) => item.name == product.name)) {
          return --quantity;
        } else {
          this.#items.push(CartItem(product, quantity));
        }
      } else {
        throw new Error("Quantity must be a positive integer.");
      }
    } else {
      throw new Error("Product must be an instance of Product class.");
    }
  }

  removeProduct(product) {
    if (product instanceof Product) {
      if (this.#items.map((item) => item.name == product.name)) {
        return this.items.splice(0, this.items.length);
      }
    } else {
      throw new Error("Product must be an instance of Product class.");
    }
  }

  applyDiscount(strategy) {
    if (strategy instanceof DiscountStrategy) {
      const discount = strategy.calculate(this);
      if (typeof discount === "number" && discount >= 0) {
        if (this.total > 0) {
          return this.total - discount;
        }
      } else {
        throw new Error("Discount must be a non-negative number.");
      }
    } else {
      throw new Error(
        "Strategy must be an instance of DiscountStrategy subclass."
      );
    }
  }
}
