const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const formatCartItems = (items) =>
  items.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    image: item.productId.image,
    price: item.productId.price,
    salePrice: item.productId.salePrice,
    quantity: item.quantity,
  }));

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: "Missing or invalid required fields",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (currentProductIndex > -1) {
      cart.items[currentProductIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding item to cart",
      error: "Failed to add item to cart",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "Missing userId",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter((productItem) => productItem.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        ...cart._doc,
        items: formatCartItems(validItems),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching cart items",
      error: "Failed to fetch cart items",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: "Missing or invalid required fields",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Cart not found",
      });
    }

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (currentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Cart item not present in cart",
      });
    }

    cart.items[currentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: {
        ...cart._doc,
        items: formatCartItems(cart.items),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating cart item",
      error: "Failed to update cart item",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }
    
  const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId,
    );

    await cart.save();
await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartItems=cart.items.map((item) => ({
      productId:item.productId? item.productId._id: null,
      title: item.productId?.title,
      image: item.productId?.image,
      price: item.productId?.price,
      salePrice: item.productId?.salePrice,
      quantity: item.quantity,
    }));

   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting cart item",
      error: "Failed to delete cart item",
    });
  }
};


module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};
