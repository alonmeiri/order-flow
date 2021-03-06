const express = require("express")
const router = express.Router()
const Order = require("../models/order")
const Customer = require("../models/customer")
const Product = require("../models/product")
const Board = require("../models/board")
const Admin = require('../models/admin');
const mailer = require('./mailer')()
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.secretKey
const crypto = require("crypto")

const validateWebhook = (req, res, next) => {
  generated_hash = crypto
    .createHmac("sha256", secretKey)
    .update(Buffer.from(req.rawbody))
    .digest("base64")
  if (generated_hash == req.headers["x-shopify-hmac-sha256"]) {
    res.sendStatus(200)
    next()
  } else {
    res.sendStatus(200)
    console.log("Not from Shopify!")
  }
}

router.post("/orders/create", validateWebhook, async (req, res) => {
  console.log('we got on order!')
  const io = req.io;
  const result = await req.body
  let socketData = {}
  const admin = await Admin.findOne({storeName:result.line_items[0].vendor})
  const cust = result.customer
  const foundCustomer = await Customer.findOne({ shopifyId: cust.id })
  if (!foundCustomer) {
    let customer = new Customer({
      shopifyId: cust.id,
      name: cust.first_name + " " + cust.last_name,
      email: cust.email,
      phone: cust.default_address.phone,
      orders: [result.id],
      adminId: admin._id
    })
    await Admin.findOneAndUpdate({_id : admin._id},{$push : {customers : customer._id}})
    await customer.save()
    socketData.customer = customer
  } else {
    foundCustomer.orders.push(result.id)
    updatedOrders = foundCustomer.orders
    const customer = await Customer.findOneAndUpdate({ shopifyId: cust.id },
      { orders: updatedOrders }, {new: true})
    socketData.customer = customer
  }

  for (let item of result.line_items) {
    let address = result.shipping_address
    const product = await Product.findOne({shopifyId : item.product_id})
    const board = await Board.findOne({products : {$in : [`${product._id}`]}})
    let order = new Order({
      date: result.created_at,
      shopifyId: result.id,
      itemId: item.id,
      customerId: result.customer.id,
      price: parseInt(result.total_price),
      product: product._id,
      attributes: item.variant_title,
      inProcess: false,
      progress: 1,
      stageEmployees: { 1: "" },
      isComplete: false,
      isReadyToShip: false,
      shippingAddress: {
        address: address.address1,
        city: address.city,
        province: address.province,
        country: address.country,
        zip: address.zip,
        company: address.company,
        name: address.name,
        phone: address.phone,
        courier:result.shipping_lines[0].title
      },
      adminId: admin._id
    })
    await order.save()
    if(board){
      await Board.updateOne(
        {_id : board._id},{$push : {orders : order._id}}
      )
      const webhookOrder = await Order.findOne({_id : order._id}).populate('product')
      // const socketData = {order: webhookOrder, boardId:board._id}
      socketData.order = webhookOrder
      socketData.boardId = board._id
      io.emit('webhook order', socketData)
    }
    mailer.sendEmail(result.id)
  }
})

module.exports = router
