const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
	stock_name: String,
	pic: String,
	risk_assessment: Number,
	industry: String,
	description: String,
	valuation: Array,
	total_shares: Number
})

module.exports = mongoose.model('Stock', stockSchema, 'Stock');