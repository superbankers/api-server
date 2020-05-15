import { Schema, model } from 'mongoose';
import * as yup from 'yup'

// ==========================================
// LISTINGS
// ==========================================

export const productTypeArray = [
  'painting', 'poems'
]

const priceCurrencyArray = ['USD']

export const listingYupSchema = yup.object().shape({
  userId: yup.string().required(),
  createdAt: yup.number().positive(),
  productType: yup.string().required().oneOf(productTypeArray),
  name: yup.string().required(),
  description: yup.string().required(),
  listingPicture: yup.string().required(),
  productInventory: yup.number().positive().integer(),
  price: yup.number().positive().integer(),
  priceCurrency: yup.string().required().oneOf(priceCurrencyArray),
})

const ListingSchema = new Schema({
  userId: String,
  createdAt: Number,
  productType: String,
  name: String,
  description: String,
  listingPicture: String,
  productInventory: Number,
  price: Number,
  priceCurrency: String,
});

export const Listings = model('Listings', ListingSchema);

export default Listings