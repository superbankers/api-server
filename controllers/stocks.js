const Stocks = require('../models/stocks')
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
				err = new Error('Loan: ' + req.params.id + ' Not Found')
				return res.status(400).end(err)
			}
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

