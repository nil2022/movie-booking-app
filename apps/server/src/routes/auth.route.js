import { Router } from 'express';
import { getUser, login, signup } from '#controllers/auth';
import { validateUserData, verifyToken } from '#middlewares/auth';

const authRouter = Router();

/********* USER ROUTES ****** */
/** Signup API **/
authRouter.post('/signup', [validateUserData], signup);
/** Sigin API **/
authRouter.post('/login', login);
authRouter.get('/:id', verifyToken, getUser);

export default authRouter;
