const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoneySetSchema = new Schema({
    shop_money: {
        amount: String,
        currency_code: String
    },
    presentment_money: {
        amount: String,
        currency_code: String
    }
});

const LineItemSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    variant_id: String,
    title: String,
    quantity: Number,
    sku: String,
    variant_title: String,
    vendor: String,
    fulfillment_service: String,
    product_id: String,
    requires_shipping: Boolean,
    taxable: Boolean,
    gift_card: Boolean,
    name: String,
    variant_inventory_management: String,
    properties: [Schema.Types.Mixed],
    product_exists: Boolean,
    fulfillable_quantity: Number,
    grams: Number,
    price: String,
    total_discount: String,
    fulfillment_status: String,
    price_set: MoneySetSchema,
    total_discount_set: MoneySetSchema,
    discount_allocations: [Schema.Types.Mixed],
    duties: [Schema.Types.Mixed],
    admin_graphql_api_id: String
});


const AddressSchema = new Schema({
  id: {
      type: String,
      required: true
  },
  customer_id: {
      type: String,
      required: true
  },
  first_name: String,
  last_name: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  province_code: String,
  country_code: String,
  country_name: String,
  default: {
      type: Boolean,
      default: false
  }
});

const ShopifyOrderSchema = new Schema({
    _id: String,
    id: {
        type: String,
        required: true
    },
    email: String,
    closed_at: Date,
    created_at: Date,
    updated_at: Date,
    number: Number,
    note: String,
    token: String,
    gateway: String,
    test: Boolean,
    total_price: String,
    subtotal_price: String,
    total_weight: Number,
    total_tax: String,
    taxes_included: Boolean,
    currency: String,
    financial_status: String,
    confirmed: Boolean,
    total_discounts: String,
    buyer_accepts_marketing: Boolean,
    name: String,
    referring_site: String,
    landing_site: String,
    cancelled_at: Date,
    cancel_reason: String,
    reference: String,
    user_id: String,
    location_id: String,
    source_identifier: String,
    source_url: String,
    device_id: String,
    phone: String,
    customer_locale: String,
    app_id: Number,
    browser_ip: String,
    landing_site_ref: String,
    order_number: String,
    discount_applications: [Schema.Types.Mixed],
    discount_codes: [Schema.Types.Mixed],
    note_attributes: [Schema.Types.Mixed],
    payment_gateway_names: [String],
    processing_method: String,
    source_name: String,
    fulfillment_status: String,
    tax_lines: [Schema.Types.Mixed],
    tags: String,
    contact_email: String,
    order_status_url: String,
    presentment_currency: String,
    total_line_items_price_set: MoneySetSchema,
    total_discounts_set: MoneySetSchema,
    total_shipping_price_set: MoneySetSchema,
    subtotal_price_set: MoneySetSchema,
    total_price_set: MoneySetSchema,
    total_tax_set: MoneySetSchema,
    line_items: [LineItemSchema],
    shipping_lines: [Schema.Types.Mixed],
    billing_address: Schema.Types.Mixed,
    shipping_address: Schema.Types.Mixed,
    fulfillments: [Schema.Types.Mixed],
    client_details: Schema.Types.Mixed,
    refunds: [Schema.Types.Mixed],
    customer: {
        id: String,
        email: String,
        created_at: Date,
        updated_at: Date,
        first_name: String,
        last_name: String,
        orders_count: Number,
        state: String,
        total_spent: String,
        last_order_id: String,
        note: String,
        verified_email: Boolean,
        multipass_identifier: String,
        tax_exempt: Boolean,
        phone: String,
        tags: String,
        last_order_name: String,
        currency: String,
        marketing_opt_in_level: String,
        tax_exemptions: [String],
        admin_graphql_api_id: String,
        default_address: AddressSchema
    },
    total_line_items_price: String
},{ collection: 'shopifyOrders' });

module.exports = mongoose.model('shopifyOrder', ShopifyOrderSchema);
