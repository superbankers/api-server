const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema} = mongoose;

const userSchema = new Schema ({
    email: String,
    password: String,
    salary: Number
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
} 

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('users', userSchema, 'users');