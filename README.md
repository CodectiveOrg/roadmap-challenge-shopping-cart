# Roadmap Quiz: 🛒 Vanilla Shopping Cart 🛒

## What is this project?

This is a small JavaScript project that manages a shopping cart.  
Think of it as the "brains" behind an online store's cart, without any user interface.  
You'll model simple real-world concepts and rules so that the cart always behaves predictably and correctly.

### What It Does

- Lets you define products (Each has a name and a non-negative price).
- Lets you add products to a cart with a quantity.
- If you add the same product name again, the quantities are combined (So you don't get duplicate lines for the same product name).
- Lets you remove a product from the cart by its name.
- Calculates the cart's total price based on product prices and quantities.
- Lets you apply discounts in two ways:
  - Fixed amount off (e.g., $5 off)
  - Percentage off (e.g., 10% off)
- Never lets the final price go below zero when discounts are applied.

### What You Will Implement

- A `Product` class to represent items you can buy.
- A `CartItem` class that pairs a product with a positive quantity and exposes a `subtotal`.
- A `Cart` class that stores items, merges by product name, computes the `total`, and supports removing and discounting.
- A `DiscountStrategy` base (`abstract`) class that other discounts inherit from.
- Two discount strategies: `FixedDiscountStrategy` and `PercentageDiscountStrategy`.

### Goal

Write the code so all provided tests pass.  
There's no UI or networking; it's a focused exercise in clean design, validation, and correct behavior.

## Tests

You will implement the code in vanilla JavaScript that passes an extensive Jest test suite.  
This guide explains exactly what to build so your implementation will pass all tests on the first try.

### Important Constraints

- Use ES modules only: `import`/`export`.
- Put all implementation in the `src` folder.
- Use kebab-case for folder and file names.
- Use classes and OOP with private fields (`#`).
- Follow the exact error messages and behavior described below.

## File and Folder Structure

Implement 6 files in `src`:

```
.
└── src/
    ├── cart/
    │   ├── cart.js
    │   └── cart-item.js
    ├── discount-strategy/
    │   ├── discount-strategy.js
    │   ├── fixed-discount-strategy.js
    │   └── percentage-discount-strategy.js
    └── product/
        └── product.js
```

Each file exports a single class as the behavior for that module:

- `Product` in `product/product.js`
- `CartItem` in `cart/cart-item.js`
- `Cart` in `cart/cart.js`
- `DiscountStrategy` in `discount-strategy/discount-strategy.js`
- `FixedDiscountStrategy` in `discount-strategy/fixed-discount-strategy.js`
- `PercentageDiscountStrategy` in `discount-strategy/percentage-discount-strategy.js`

**Only use named exports, not default exports.**

Do not create any other files or change test locations. Keep public APIs exactly as described.

## Implementation Requirements

Below are precise class contracts. Match names, signatures, validations, and error messages exactly.

**All error messages are gathered at the last chapter for your convenience.**

### 1) `src/product/product.js`

Export `Product` class with:

- Private fields: `#name`, `#price`.
- Constructor `(name, price)`:
  - Validate `name` is a non-empty string after `trim()`. If invalid, throw [Error 1](#error-1)
  - Validate `price` is a number, not `NaN`, and `price >= 0`. If invalid, throw [Error 2](#error-2)
  - Assign `this.#name = name.trim()` and `this.#price = price`.
- Getters only (No setters):
  - `get name()` → returns the name
  - `get price()` → returns the number

### 2) `src/cart/cart-item.js`

Export `CartItem` class with:

- Private fields: `#product`, `#quantity`.
- Constructor `(product, quantity)`:
  - Validate `product` is an instance of `Product`. If invalid, throw [Error 3](#error-3)
  - Set `this.#product = product`.
  - Set `this.quantity = quantity` (This must use the setter below so validation applies).
- Getters:
  - `get product()` → returns the product
  - `get quantity()` → returns the quantity
- Setter:
  - `set quantity(value)`:
    - Validate `value` is an integer and `value > 0`. If invalid, throw [Error 4](#error-4)
    - Assign `this.#quantity = value`.
- Computed getter:
  - `get subtotal()` → returns `this.#product.price * this.#quantity`

### 3) `src/cart/cart.js`

Export `Cart` class with:

- Private field: `#items` (Array of `CartItem`). Initialize to `[]` in the constructor.
- Getters:
  - `get items()` → returns a new array `[...]` that shallow-copies the internal array (Same `CartItem` instances, new array reference).
  - `get total()` → returns the sum of all `item.subtotal` values.
- Methods:
  - `addProduct(product, quantity = 1)`:
    - Validate `product` is an instance of `Product`. If invalid, throw [Error 3](#error-3)
    - Validate `quantity` is an integer and `quantity > 0`. If invalid, throw [Error 4](#error-4)
    - If an item with the same `product.name` already exists, increase its quantity by `quantity` and return.
    - Otherwise, push a new `CartItem(product, quantity)` onto `#items`.
  - `removeProduct(product)`:
    - Validate `product` is an instance of `Product`. If invalid, throw [Error 3](#error-3)
    - Remove all items whose `item.product.name === product.name`.
  - `applyDiscount(strategy)`:
    - Validate `strategy` is an instance of `DiscountStrategy`. If invalid, throw [Error 5](#error-5)
    - Call `const discount = strategy.calculate(this)`.
    - Validate `discount` is a number, not `NaN`, and `discount >= 0`. If invalid, throw [Error 6](#error-6)
    - Return price after discount is applied (Cannot be less than zero).

### 4) `src/discount-strategy/discount-strategy.js`

Export abstract base class `DiscountStrategy` with:

- Constructor that throws when directly instantiated:
  - If `new.target === DiscountStrategy`, throw [Error 7](#error-7)
- Method to be overridden:
  - `calculate(cart)` - base implementation must always throw [Error 8](#error-8)

### 5) `src/discount-strategy/fixed-discount-strategy.js`

Export `FixedDiscountStrategy` that extends `DiscountStrategy`:

- Private field: `#amount`.
- Constructor `(amount)`:
  - Validate number, not `NaN`, and `amount >= 0`. If invalid, throw [Error 9](#error-9)
  - Assign `this.#amount = amount`.
- `calculate(cart)`:
  - Validate `cart` is an instance of `Cart`. If invalid, throw [Error 10](#error-10)
  - Return discount (Cannot be greater than total price).

### 6) `src/discount-strategy/percentage-discount-strategy.js`

Export `PercentageDiscountStrategy` that extends `DiscountStrategy`:

- Private field: `#percentage`.
- Constructor `(percentage)`:
  - Validate number, not `NaN`, and `0 <= percentage <= 100`. If invalid, throw [Error 11](#error-11)
  - Assign `this.#percentage = percentage`.
- `calculate(cart)`:
  - Validate `cart` is an instance of `Cart`. If invalid, throw [Error 10](#error-10)
  - Return discount (Cannot be greater than total price).

## Clean Code and Design Expectations

- Use classes and keep state in private fields (`#field`).
- Prefer small, focused getters and methods.
- Validate inputs at the boundary of each public API (Constructors, setters, public methods).
- Use early throws with the exact messages shown above.
- Avoid side effects in getters; `items` returns a fresh array copy (Not a deep clone).
- Keep method names and behavior exactly as specified; tests rely on these contracts.

## How To Run the Tests Locally

1. Install dependencies:
   ```
   npm install
   ```
2. Run the test script:
   ```
   npm test
   ```

### Notes

- You may see a Node warning about experimental VM modules; it is expected and harmless.
- Do not modify tests. Implement the code in `src/` until all tests pass.

## Error Messages

### Error 1

```
Name must be a non-empty string.
```

### Error 2

```
Price must be a non-negative number.
```

### Error 3

```
Product must be an instance of Product class.
```

### Error 4

```
Quantity must be a positive integer.
```

### Error 5

```
Strategy must be an instance of DiscountStrategy subclass.
```

### Error 6

```
Discount must be a non-negative number.
```

### Error 7

```
DiscountStrategy is abstract and cannot be used directly.
```

### Error 8

```
Subclasses must implement calculate method.
```

### Error 9

```
Amount must be a non-negative number.
```

### Error 10

```
Cart must be an instance of Cart class.
```

### Error 11

```
Percentage must be a number from 0 to 100.
```
