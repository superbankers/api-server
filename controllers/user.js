const Users = require('../models/user')
const Stocks = require('../models/stocks')
const Loans = require('../models/loans')
const Events = require('../models/events')
const mongoose = require('mongoose')

export const loadGame = (req, res) => {
	try {
		const object = {
			user: null,
			profile: null,
			stocks: null,
			loans: null,
			events: null
		}

		const {username} = req.body
		Users.findOne({username: username})
		.then(async (user) => {
			if (user) {
				object.user = user
				object.profile = user.profile
				await Stocks.find().then((stocks) => {
					object.stocks = stocks
				})

				await Loans.find().then((loans) => {
					object.loans = loans
				})

				await Events.find().then((events) => {
					object.events = events
				})

				return res.status(200).json(object)
			}
			else {
				let err = new Error('User: ' + username + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const restartGame = (req, res) => {
	try {
		const {username} = req.body
		Users.findOne({username: username})
		.then((user) => {
			if (user) {
				user.profile = user.restartGame()
				user.save()
				return res.status(200).json(user)
			}
			else {
				err = new Error('User: ' + username + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const getUserById = (req, res) => {
	try {
		Users.findById(mongoose.Types.ObjectId(req.params.id))
		.then((user) => {
			if (user) {
				return res.status(200).json(user)
			}
			else {
				err = new Error('User: ' + req.params.id + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}