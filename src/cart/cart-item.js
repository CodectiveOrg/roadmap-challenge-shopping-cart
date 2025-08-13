import { Product } from "../product/product";

export class CartItem {
  #product;
  #quantity;

  constructor(product, quantity) {
    if (product instanceof Product) {
      this.#product = product;
    } else {
      throw new Error("Product must be an instance of Product class.");
    }

    this.quantity = quantity;
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    if (Number.isInteger(value) && value > 0) {
      this.#quantity = value;
    } else {
      throw new Error("Quantity must be a positive integer.");
    }
  }

  get subtotal() {
    return this.product.price * this.quantity;
  }
}
