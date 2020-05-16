const Loans = require('../models/loans')
const Users = require('../models/user')
const mongoose = require('mongoose')
const request = require('request')

export const applyLoan = (req, res) => {
	const {start, end, name, username, amount} = req.body
	try {
		if (!req.body) {
			throw err
		}
		
		Users.findOne({username: username})
		.then((user) => {
			let user_loans  = {loans: user.profile.loans}
			let has_loan = false

			for (loan in user_loans['loans']) {
				if (name === user_loans['loans'][loan].name) {
					user_loans['loans'][loan].amount += amount
					has_loan = true
					break
				}
			}
			if (!has_loan) {
				user_loans['loans'].push({
					name: name,
					amount: amount,
					start: start,
					end: end
				})
			}
			console.log(user_loans)
			user.profile.loans = user_loans
			// user.save()
			return res.status(200).json(user.profile.loans)
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

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