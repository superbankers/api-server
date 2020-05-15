import { Router } from 'express'
import { createNewUser, login } from '../../controllers/authentication'
import { createNewListing, getListingsByType } from '../../controllers/shop'
const router = Router();

router.get('/authentication/login/:id/:password', login)
router.post('/authentication/new-user', createNewUser)

router.get('/shop/listings/:type/:id/:password', getListingsByType)
router.post('/shop/new-listing/:id/:password', createNewListing)

export default router;
