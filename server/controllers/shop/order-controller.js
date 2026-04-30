const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

const normalizeCartItems = (items = []) =>
  items
    .filter((item) => item?.productId)
    .map((item) => ({
      productId: item.productId._id || item.productId,
      title: item.productId.title,
      image: item.productId.image,
      price:
        item.productId.salePrice > 0 ? item.productId.salePrice : item.productId.price,
      quantity: item.quantity,
    }));

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      email,
      phone,
      address,
      city,
      postalCode,
      notes,
      paymentMethod,
    } = req.body;

    if (
      !userId ||
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required checkout details.",
      });
    }

    if (paymentMethod !== "cash_on_delivery") {
      return res.status(400).json({
        success: false,
        message: "Only Cash on Delivery orders are supported right now.",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title image price salePrice",
    });

    if (!cart || !cart.items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const orderItems = normalizeCartItems(cart.items);

    if (!orderItems.length) {
      return res.status(400).json({
        success: false,
        message: "No valid products were found in your cart.",
      });
    }

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      userId,
      customerName,
      email,
      phone,
      address,
      city,
      postalCode,
      notes,
      paymentMethod,
      items: orderItems,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to place order.",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
