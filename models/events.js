const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
	event_name: String,
	pic: String,
	description: String
})

module.exports = mongoose.model('Event', eventSchema, 'Event');