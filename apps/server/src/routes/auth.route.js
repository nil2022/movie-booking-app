import { Router } from 'express'
import { signup } from '#controllers/auth'
import { validateUserData } from '#middlewares/auth'

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