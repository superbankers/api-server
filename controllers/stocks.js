const Stocks = require('../models/stocks')
const Users = require('../models/user')
const mongoose = require('mongoose')

export const getStocks = (req, res) => {
	try {
		Stocks.find({})
		.then((stocks) => {
			return res.status(200).json(stocks)
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const getStocksById = (req, res) => {
	try {
		Stocks.findById(mongoose.Types.ObjectId(req.params.id))
		.then((stocks) => {
			if (stocks) {
				return res.status(200).json(stocks)
			}
			else {
				err = new Error('Stock: ' + req.params.id + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const buyStock = async (req, res) => {
	try {
		const {username, name, shares, value} = req.body
		
		Stocks.findOne({name: name})
		.then(async (stock) => {
			stock.total_shares -= shares
			stock.save()

			await Users.findOne({username: username})
			.then((user) => {
				user.profile.bank_balance -= value * shares

				const user_stocks = { stocks: user.profile.stocks }
				let own_stock = false
				
				for (stock in user_stocks['stocks']) {
					if (name === user_stocks['stocks'][stock].name) {
						user_stocks['stocks'][stock].shares += shares
						own_stock = true
						break
					}
				}
				if (!own_stock) {
					user_stocks['stocks'].push({
						name: name,
						shares: shares
					})
				}
				
				user.profile.stocks = user_stocks['stocks']
				user.save()
				return res.status(200).json(user.profile.stocks)
			})
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const sellStock = async (req, res) => {
	try {
		const {username, name, shares, value} = req.body
		
		Stocks.findOne({name: name})
		.then(async (stock) => {
			stock.total_shares += shares
			stock.save()

			await Users.findOne({username: username})
			.then((user) => {
				user.profile.bank_balance += value * shares
				
				const user_stocks = { stocks: user.profile.stocks }
				let own_stock = false
				
				for (stock in user_stocks['stocks']) {
					if (name === user_stocks['stocks'][stock].name) {
						user_stocks['stocks'][stock].shares -= shares
						own_stock = true
						break
					}
				}
				if (!own_stock) {
					user_stocks['stocks'].push({
						name: name,
						shares: shares
					})
				}
				
				user.profile.stocks = user_stocks['stocks']
				user.save()
				return res.status(200).json(user.profile.stocks)
			})
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}