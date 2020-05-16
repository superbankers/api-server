import { Router } from 'express'
import { signup, login } from '../../controllers/auth'
import { getLoans, getLoansById, applyLoan, repayLoan } from '../../controllers/loan'
import { getStocks, getStocksById, buyStock, sellStock } from '../../controllers/stocks'
import { loadGame, restartGame, getUserById } from '../../controllers/user'
import { getEvents, getEventsById } from '../../controllers/events'
const router = Router();

router.post('/signup/', signup)
router.post('/login/', login)

router.post('/loadGame/', loadGame)
router.put('/restartGame/', restartGame)

router.post('/stocks/buy/', buyStock)
router.post('/stocks/sell/', sellStock)

router.post('/loans/applyLoan', applyLoan)
router.post('/loans/repayLoan', repayLoan)

// router.get('/user/:id', getUserById)

// router.get('/loans/all', getLoans)
// router.get('/loans/:id', getLoansById)

// router.get('/stocks/all', getStocks)
// router.get('/stocks/:id', getStocksById)

// router.get('/events/all', getEvents)
// router.get('/events/:id', getEventsById)

export default router;
