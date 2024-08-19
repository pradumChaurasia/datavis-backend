const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const ShopifyCustomerSchema = new Schema({
    _id: String,
    admin_graphql_api_id: String,
    created_at: Date,
    currency: String,
    default_address: AddressSchema,
    email: String,
    email_marketing_consent: {
        state: String,
        opt_in_level: String,
        consent_updated_at: Date
    },
    first_name: String,
    id: {
        type: String,
        required: true
    },
    last_name: String,
    last_order_id: String,
    last_order_name: String,
    multipass_identifier: String,
    note: String,
    orders_count: Number,
    phone: String,
    sms_marketing_consent: Schema.Types.Mixed,
    state: String,
    tags: String,
    tax_exempt: Boolean,
    tax_exemptions: [String],
    total_spent: String,
    updated_at: Date,
    verified_email: Boolean,
    addresses: [AddressSchema]
},{ collection: 'shopifyCustomers' });

const shopifyCustomer = mongoose.model('shopifyCustomer', ShopifyCustomerSchema);

module.exports = shopifyCustomer
