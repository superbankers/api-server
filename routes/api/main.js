import { Router } from 'express'
import { signup, login } from '../../controllers/auth'
import { getLoans, getLoansById } from '../../controllers/loan'
import { getStocks, getStocksById } from '../../controllers/stocks'
import { getEvents, getEventsById } from '../../controllers/events'
const router = Router();

router.post('/auth/signup/', signup)
router.post('/auth/login/', login)

router.get('/loans/all', getLoans)
router.get('/loans/:id', getLoansById)

router.get('/stocks/all', getStocks)
router.get('/stocks/:id', getStocksById)

router.get('/events/all', getEvents)
router.get('/events/:id', getEventsById)

export default router;
