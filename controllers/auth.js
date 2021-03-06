const express = require('express')
const passport = require('passport')
const User = require('../models/user')

export const login = (req, res) => {
  passport.authenticate('local-login', (err, user, info) => {
		if (err) {
			return res.status(500).json({message: 'Internal Server Error'})
		}
		if (!user) {
			return res.status(401).json(info)
		}
		req.login(user, {session: false}, (err) => {
			if (err) {
				// res.send(err)
				console.log('Error')
			}
			else {
				return res.status(200).end(JSON.stringify(user))
			}
		})
	})(req, res)
}

export const signup = async (req, res) => {
	const {username, password} = req.body

	const user = await User.findOne({username: username});
	if(user) {
			return res.status(400).json({'message': 'Username already exists'})
	} else {
			const newUser = new User();
			newUser.username = username;
			newUser.password = newUser.encryptPassword(password);
			try {
				newUser.save();
			}
			catch (err) {
				return res.status(500).json({'message': 'Internal Server Error'})
			}
			return res.status(200).json(newUser);
	}
}

export default {}