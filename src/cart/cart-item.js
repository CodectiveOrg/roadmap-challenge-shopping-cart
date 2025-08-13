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

    if (
      typeof quantity === "number" &&
      quantity > 0 &&
      Number.isInteger(quantity)
    ) {
      this.#quantity = quantity;
    } else {
      throw new Error("Quantity must be a positive integer.");
    }
  }

  get product() {
    return this.#product;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    if (typeof value === "number" && value > 0 && Number.isInteger(value)) {
      this.#quantity = value;
    } else {
      throw new Error("Quantity must be a positive integer.");
    }
  }

  get subtotal() {
    return this.#product.price * this.#quantity;
  }
}
