const Events = require('../models/events')
const mongoose = require('mongoose')

export const getEvents = (req, res) => {
	try {
		Events.find({})
		.then((events) => {
			return res.status(200).json(events)
		})
	}
	catch (err) {
		return res.status(500).end()
	}
}

export const getEventsById = (req, res) => {
	try {
		Events.findById(mongoose.Types.ObjectId(req.params.id))
		.then((events) => {
			if (events) {
				return res.status(200).json(events)
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

