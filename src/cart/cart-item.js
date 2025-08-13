import { Product } from "../product/product.js";

export class CartItem {
  #product;
  #quantity;
  constructor(product, quantity) {
    this.#product = new Product(product?.name, product?.price);
    this.#quantity(quantity);
  }

  get quantity() {
    return this.#quantity;
  }

  get product() {
    return this.#product;
  }

  set quantity(quantity) {
    if (this.#quantity > 0) {
      this.#quantity = quantity;
    }
  }

  get subtotal() {
    return this.#product.price * this.#quantity;
  }
}
