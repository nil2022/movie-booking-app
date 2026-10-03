import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import httpStatus from 'http-status';
import { getUser, login, signup } from '#controllers/auth';
import { validateLoginData, validateUserData, verifyToken } from '#middlewares/auth';
import { sendResponse } from '#utils/general';

const authRouter = Router();

/** Brute-force protection for credential endpoints (per IP) */
const credentialsLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	handler: (req, res) => sendResponse(res, httpStatus.TOO_MANY_REQUESTS, null, 'Too many attempts, please try again later'),
});

/********* USER ROUTES ****** */
/** Signup API **/
authRouter.post('/signup', credentialsLimiter, [validateUserData], signup);
/** Sigin API **/
authRouter.post('/login', credentialsLimiter, validateLoginData, login);
authRouter.get('/:id', verifyToken, getUser);

export default authRouter;
