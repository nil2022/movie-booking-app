import { Router } from 'express';
import { login, signup } from '#controllers/auth';
import { validateUserData } from '#middlewares/auth';

const authRouter = Router();

/********* USER ROUTES ****** */
/** Signup API **/
authRouter.post('/signup', [validateUserData], signup);
/** Sigin API **/
authRouter.post('/login', login);

export default authRouter;
