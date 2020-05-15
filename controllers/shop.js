import { Listings, listingYupSchema, productTypeArray } from '../models/shop'
import { checkPassword } from './authentication'
import { ErrorHandler } from '../common/helpers/error-handling'

// GET
// =====================================
export const getListingsByType = async (req, res) => {
  try {
    const { id, password, type } = req.params
    await checkPassword(id, password)
    if (!productTypeArray.includes(type)) throw { err: 'Invalid Product Type' }
    const listings = await Listings.find({ productType: type });
    res.status(200).end(JSON.stringify(listings))
  } catch (err) {
    ErrorHandler(err, res)
  }
}

// POST
// =====================================
export const createNewListing = async (req, res) => {
  try {
    const user = await checkPassword(req.params.id, req.params.password)
    if (user.userType !== 'artist') throw { err: 'Invalid User Type' }
    const listingObject = {
      ...req.body,
      createdAt: new Date().getTime(),
      userId: req.params.id
    }
    const returnValue = await listingYupSchema.validate(listingObject)
    // SAVE LISTING
    let NewListing = new Listings(returnValue);
    const data = await NewListing.save()
    res.status(200).end(JSON.stringify(data))
  } catch (err) {
    ErrorHandler(err, res)
  }
}