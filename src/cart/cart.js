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
    let findItem = this.#items.find(
      (item) => item?.product?.name == product.name
    );
    if (product instanceof Product) {
      if (Number.isInteger(quantity) && quantity > 0) {
        if (product.name === findItem?.product.name) {
          return new CartItem(product, ++quantity);
        } else {
          this.#items.push(new CartItem(product, quantity));
        }
      } else {
        throw new Error("Quantity must be a positive integer.");
      }
    } else {
      throw new Error("Product must be an instance of Product class.");
    }
  }

  removeProduct(product) {
    let findMatchItems = this.#items.filter(
      (item) => item?.product?.name === product.name
    );
    if (product instanceof Product) {
      if (findMatchItems?.length > 0) {
        let newItems = this.#items.filter(
          (item) => item?.product.name !== product.name
        );
        return newItems;
      } else {
        return this.#items;
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
          if (this.total - discount < 0) {
            return 0;
          }
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
