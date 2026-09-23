const Cart = require("../model/Cart");
const Product = require("../model/Product");


// =========================
// ADD TO CART
// =========================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log(req.body);

    const userId = req.user.id;

    // 1. Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // 2. Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 3. Check stock
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`,
      });
    }

    // 4. Find user's cart
    let cart = await Cart.findOne({
      user: userId,
    });

    // 5. Check if product already exists
    const existingItem = cart?.items?.find(
      (item) => item.product.toString() === productId
    );

    // 6. Product already exists
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available`,
        });
      }

      existingItem.quantity = newQuantity;
        await cart.save();

    return res.status(200).json({
        message: "Quantity increased",
        cart,
        isNew: false
    });
}
    

    // 7. Product doesn't exist
    else {
      // Create cart if it doesn't exist
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [],
        });
      }

      cart.items.push({
        product: productId,
        quantity: quantity,
      });
    }

    // 8. Save cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
      isNew: true

    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================
// GET CART
// =========================
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================
// UPDATE CART
// =========================
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user.id;

    // 1. Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // 2. Find cart
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // 3. Find item in cart
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    // 4. Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product no longer exists",
      });
    }

    // 5. Check stock
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`,
      });
    }

    // 6. Update quantity
    item.quantity = quantity;

    // 7. Save
    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================
// REMOVE FROM CART
// =========================
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;

    // 1. Find cart
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // 2. Find item
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    // 3. Remove product
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // 4. Save
    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  updateCart,
};