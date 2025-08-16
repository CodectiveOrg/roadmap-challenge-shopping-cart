import { Product } from "../product/product";
import { CartItem } from "./cart-item";
import { DiscountStrategy } from "../discount-strategy/discount-strategy";

export class Cart {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return [...this.#items];
  }

  get total() {
    return this.#items.reduce((acc, item) => acc + item.subtotal, 0);
  }

  addProduct(product, quantity = 1) {
    let existing = this.#items.find(
      (item) => item.product.name === product.name
    );

    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      throw new Error("Quantity must be a positive integer.");
    }

    if (existing) {
      existing.quantity += quantity;
      return;
    }
    this.#items.push(new CartItem(product, quantity));
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class.");
    }

    this.#items = this.#items.filter(
      (item) => item?.product.name !== product.name
    );
  }

  applyDiscount(strategy) {
    if (!(strategy instanceof DiscountStrategy)) {
      throw new Error(
        "Strategy must be an instance of DiscountStrategy subclass."
      );
    }
    const discount = strategy.calculate(this);
    if (
      typeof discount !== "number" ||
      Number.isNaN(discount) ||
      discount < 0
    ) {
      throw new Error("Discount must be a non-negative number.");
    }
    if (this.total - discount < 0) {
      return 0;
    } else {
      return this.total - discount;
    }
    // return Math.max(0, this.total - discount);
  }
}

// [{ product: { name: "a", price: 1.2 }, quantity: 10 }, { product: {name:"b",  price: 0.5 },quantity: 20 },{ product: {name:"b",  price: 0.5 },quantity: 20 },{ product: {name:"b",  price:88 },quantity: 18 }]
