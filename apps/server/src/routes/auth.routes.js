import { Router } from 'express'
import { signup } from '../controllers/auth.controller.js'
import { validateUserData } from '../middlewares/auth.middleware.js'

const router = Router()


/********* USER ROUTES ****** */
/** Signup API **/
router.post('/signup', [validateUserData], signup)
/** Sigin API **/
router.post('/login', (req, res) => {
    console.log('Signup Route')
    res.send('Signup Route')
})

export default router