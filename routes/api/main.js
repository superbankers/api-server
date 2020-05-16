import { Router } from 'express'
import { signup, login } from '../../controllers/auth'
import { getLoans, getLoansById } from '../../controllers/loan'
import { getStocks, getStocksById, buyStock } from '../../controllers/stocks'
import { loadGame, restartGame, getUserById } from '../../controllers/user'
import { getEvents, getEventsById } from '../../controllers/events'
const router = Router();

router.post('/signup/', signup)
router.post('/login/', login)

router.get('/loadGame/:id', loadGame)
router.put('/restartGame/:id', restartGame)

router.get('/user/:id', getUserById)

router.get('/loans/all', getLoans)
router.get('/loans/:id', getLoansById)

router.get('/stocks/all', getStocks)
router.get('/stocks/:id', getStocksById)
router.post('/stocks/buy/:id', buyStock)

router.get('/events/all', getEvents)
router.get('/events/:id', getEventsById)

export default router;
