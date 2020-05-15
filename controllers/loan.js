const Loans = require('../models/loans')
const mongoose = require('mongoose')

export const getLoans = (req, res) => {
	try {
		Loans.find({})
		.then((loans) => {
			return res.status(200).json(loans)
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const getLoansById = (req, res) => {
	try {
		Loans.findById(mongoose.Types.ObjectId(req.params.id))
		.then((loans) => {
			if (loans) {
				return res.status(200).json(loans)
			}
			else {
				err = new Error('Loan: ' + req.params.id + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}