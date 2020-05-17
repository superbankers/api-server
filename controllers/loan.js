const Loans = require('../models/loans')
const Users = require('../models/user')
const mongoose = require('mongoose')
const axios = require('axios')
const loanAccount = require('../loanAccount.json')

export const applyLoan = (req, res) => {
	const {start, end, name, username, amount} = req.body
	console.log(req.body)
	try {
		if (username) {
			Users.findOne({username: username})
			.then((user) => {
				user.bank_balance += amount

				let user_loans  = {loans: user.profile.loans}
				
				user_loans['loans'].push({
					name: name,
					amount: amount,
					start: start,
					end: end
				})
				user.profile.loans = user_loans['loans']
				user.save()
				return res.status(200).send(true)
			})
			.then(() => {
				loanAccount['loanAccount'].loanName = name
				loanAccount['loanAccount'].loanAmount = amount
				axios.post('https://razerhackathon.sandbox.mambu.com/api/loans', loanAccount, {
					auth: {
						username: 'Team98',
						password: 'pass16F08D3D40'
					}
				})
				.then((response) => {
					if (response.data) {
						return res.status(200).send(true)
					}
				})
				.catch((err) => {
					console.log(err)
					return res.status(402).end()
				})
			})
			.catch((err) => {
				return res.status(500).end()
			})
		}
		else {
			return res.status(500).send(false)
		}
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const repayLoan = (req, res) => {
	const {start, end, name, username, amount} = req.body
	try {
		if (!req.body) {
			throw err
		}
		
		Users.findOne({username: username})
		.then((user) => {
			user.bank_balance -= amount

			let user_loans  = {loans: user.profile.loans}
			
			user_loans['loans'].pop({
				name: name,
				amount: amount,
				start: start,
				end: end
			})
			user.profile.loans = user_loans['loans']
			user.save()
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