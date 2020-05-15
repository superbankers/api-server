import { Schema, model } from 'mongoose';
import * as yup from 'yup'
import { codes } from 'iso-country-codes';
import countryTelephoneCode from 'country-telephone-code'

// ==========================================
// USER PROFILE
// ==========================================

// ARRAY REDUCER FOR { alpha3: '' } to [name]
const arrayReducerCountry = (accumulator, currentValue) => [...accumulator, currentValue.alpha3]
export const arrayReducer = array => array.reduce(arrayReducerCountry, [])

// CREATE COUNTRY CODE ARRAY
const telephoneCode = () => codes.map((code) => {
  // 'Bouvet Island' => 55 |||| 'Heard Island and McDonald Islands' => 0
  const telCodeExceptions = countryTelephoneCode(code.alpha2) === 'Bouvet Island' ? ['55'] : ['0']
  return countryTelephoneCode(code.alpha2) ?
    parseInt(countryTelephoneCode(code.alpha2)[0], 10) :
    parseInt(telCodeExceptions[0], 10)
})

export const userYupSchema = yup.object().shape({
  userType: yup.string().required().oneOf(['user', 'artist']),
  email: yup.string().required().email(),
  password: yup.string().required(),
  firstName: yup.string().required().max(30),
  lastName: yup.string().required().max(30),
  phoneCountryCode: yup.number().positive().integer().oneOf(telephoneCode()),
  phoneNumber: yup.number().positive().integer(),
  countryCode: yup.string().required().oneOf(arrayReducer(codes)),
  mailingAddress: yup.string().required(),
  postalCode: yup.number().positive().integer(),
  profilePicture: yup.string().required(),
  createdAt: yup.number().positive(),
  companyName: yup.string(),
  flags: yup.object().shape({
    emailVerified: yup.bool()
  })
});

const UserProfileSchema = new Schema({
  createdAt: Number,
  userType: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneCountryCode: Number,
  phoneNumber: Number,
  countryCode: String,
  mailingAddress: String,
  postalCode: Number,
  profilePicture: String,
  companyName: String,
  flags: {
    emailVerified: String,
  }
});

export const UserProfiles = model('UserProfile', UserProfileSchema);

export default UserProfiles