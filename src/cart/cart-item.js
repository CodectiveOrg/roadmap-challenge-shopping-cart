import { Product } from "../product/product.js";

export class CartItem {
  #product;
  #quantity;

  constructor(product, quantity) {
    if (product === null || product === undefined) {
      throw new Error("Product must be an instance of Product class.");
    }
    if (!product) {
      throw new Error("Product must be an instance of Product class.");
    }
    if (!(Object.getPrototypeOf(product) === Product.prototype)) {
      throw new Error("Product must be an instance of Product class.");
    }

    this.#product = product;

    this.quantity = quantity;
  }

  set quantity(value) {
    if (value === null || value === undefined) {
      throw new Error("Quantity must be a positive integer.");
    }

    if (
      !value ||
      Object.getPrototypeOf(value) === Boolean.prototype ||
      Object.getPrototypeOf(value) === String.prototype
    ) {
      throw new Error("Quantity must be a positive integer.");
    }

    if (Object.getPrototypeOf(value) === Array.prototype) {
      if (value.length === 0) {
        throw new Error("Quantity must be a positive integer.");
      }
    }

    if (Object.getPrototypeOf(value) === Object.prototype) {
      if (value.constructor === Object && Object.keys(value).length === 0) {
        throw new Error("Quantity must be a positive integer.");
      }
    }

    if (!Object.getPrototypeOf(value) === Number.prototype) {
      throw new Error("Quantity must be a positive integer.");
    }

    if (Object.getPrototypeOf(value) === Number.prototype) {
      if (!Number.isInteger(value)) {
        throw new Error("Quantity must be a positive integer.");
      }

      if (Number.isInteger(value)) {
        if (value <= 0) {
          throw new Error("Quantity must be a positive integer.");
        }
      }
    }

    this.#quantity = value;
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity;
  }

  get subtotal() {
    return this.#product.price * this.#quantity;
  }
}
