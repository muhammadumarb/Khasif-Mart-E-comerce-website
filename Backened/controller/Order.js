const Ordermodel = require("../model/Order");
const products = require("../model/Product");
const cart = require("../model/Cart");
const authmodel = require("../model/Auth.model");
const transporter = require("../Services/mail");

exports.createOder = async (req, res) => {
  try {
    const { username, number, Address } = req.body;

    // JWT se user id
    const userId = req.user.id;

    // User find
    const user = await authmodel.findById(userId);

    if (!user) {
      return res.status(404).json({
        mess: "User Not Found",
      });
    }

    // Cart find
    const card = await cart.findOne({ user: userId });

    if (!card) {
      return res.status(404).json({
        mess: "Cart Not Found",
      });
    }

    // Cart empty check
    if (!card.items || card.items.length === 0) {
      return res.status(400).json({
        mess: "Cart is Empty",
      });
    }

    // Order items
    const orderItems = [];

    let totalAmount = 0;

    // Cart ke products
    for (const item of card.items) {
      const product = await products.findById(item.product);

      if (!product) {
        return res.status(404).json({
          mess: "Product Not Found",
        });
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        productname :product.name,
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // ONE order create
    const order = await Ordermodel.create({
      user: userId,
      items: orderItems,
      username,
      number,
      Address,
      totalAmount,
    });

    // Cart empty
    card.items = [];
    await card.save();

    console.log("=== EMAIL DEBUG ===");
console.log("user.email:", user.email);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
    // User email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Order Confirmed",
      html: `
        <h2>Order Confirmed</h2>

        <p>Hello ${username},</p>

        <p>Your order has been successfully placed.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Products:</strong>
<ul>
${orderItems.map(item => `
  <li>
    ${item.productname}
    (Qty: ${item.quantity})
    - Rs.${item.price}
  </li>
`).join("")}
</ul>
</p>
        <p><strong>Total Amount:</strong> Rs. ${totalAmount}</p>
        <p><strong>Address:</strong> ${Address}</p>

        <p>Thank you for shopping with us.</p>
      `,
    });

    // Admin email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      html: `
        <h2>New Order</h2>

        <p><strong>Customer:</strong> ${username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Address:</strong> ${Address}</p>
        <p><strong>Total:</strong> Rs. ${totalAmount}</p>
<p><strong>Products:</strong>
<ul>
${orderItems.map(item => `
  <li>
    ${item.productname}
    (Qty: ${item.quantity})
    - Rs.${item.price}
  </li>
`).join("")}
</ul>
</p>

        <p><strong>Order ID:</strong> ${order._id}</p>
      `,
    });

    res.status(201).json({
      mess: "Order Created Successfully",
      success:true,
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      mess: error.message,
    });
  }
};