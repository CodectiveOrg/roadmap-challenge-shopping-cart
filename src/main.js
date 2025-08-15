import { Product } from "./product/product.js";
import { Cart } from "./cart/cart.js";
import { FixedDiscountStrategy } from "./discount-strategy/fixed-discount-strategy.js";
import { PercentageDiscountStrategy } from "./discount-strategy/percentage-discount-strategy.js";

function main() {
  const cart = new Cart();

  const p1 = new Product("name1", 20);
  const p2 = new Product("name1", 40);
  const p3 = new Product("name1", 100);

  cart.addProduct(p1, 2);
  cart.addProduct(p2, 8);
  cart.addProduct(p3, 10);

  const fixedDiscountStrategy = new PercentageDiscountStrategy(50);

  console.log("after discount : ", cart.applyDiscount(fixedDiscountStrategy));

  showCart(cart);
}

function showCart(cart) {
  cart.items.forEach((item, index) => {
    console.log("-".repeat(20), `item : ${index + 1}`);
    console.log(" |product name : ", item.product.name);
    console.log(" |product quantity : ", item.quantity);
    console.log(" |product price : ", item.product.price);
    console.log(
      " |product total price : ",
      `${item.quantity} * ${item.product.price} = ${item.quantity * item.product.price}`,
    );
  });

  console.log("_".repeat(40));

  console.log("cart total prices: ", cart.total);
}

main();
