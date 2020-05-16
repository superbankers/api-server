const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema} = mongoose;

const userSchema = new Schema ({
    username: String,
    password: String,
    profile: {
        bank_balance: Number,
        loans: [
            {
                name: String,
                amount: Number,
                start: Number,
                end: Number
            }
        ],
        stocks: [
            {
                name: String,
                shares: Number
            }
        ]
    },
    firstName: String,
    lastName: String,
    preferredLanguage: String,
    notes: String,
    branchKey: String,
    idDocuments: [
        {
            identificationDocumentTemplateKey: String,
            issuingAuthority: String,
            documentType: String,
            validUntil: String,
            documentId: String
        }
    ]
});

userSchema.methods.restartGame = () => {
    const profile = `{
        "bank_balance": 2000, 
        "loans": [], 
        "stocks": []
    }`
    return JSON.parse(profile)
}

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
} 

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('users', userSchema, 'users');