const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
//initail start
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //product find 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    //add to cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (findCurrentProductIndex > -1) {
      cart.items[findCurrentProductIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding item to cart",
      error: "Failed to add item to cart",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId " });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const validateItems = cart.items.filter(
      (productItem) => productItem.productId,
    );
    if (validateItems.length < cart.items.length) {
      cart.items = validateItems;  
      await cart.save();
    }
    const populateCartItems = validateItems.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching cart items",
      error: "Failed to fetch cart items",
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
};