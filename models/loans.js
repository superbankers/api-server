const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanSchema = new Schema({
	loanName: String,
	pic: String,
	bank: String,
	risk_assessment: Number,
	description: String,
	interest_rates: Array
})

module.exports = mongoose.model('Loan', loanSchema, 'Loan');