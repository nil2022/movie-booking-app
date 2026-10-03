import env from '#config/env';
import { sendResponse } from '#utils/general';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chalk from 'chalk';
import { AUTH_COOKIE_NAME } from '#utils/general';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_ID_REGEX = /^[a-zA-Z0-9_.-]{3,30}$/;
// bcrypt only hashes the first 72 bytes, so longer passwords add no security
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

const badRequest = (res, message) => res.status(httpStatus.BAD_REQUEST).json({ success: false, status: false, message });

const isNonEmptyString = (value, maxLength) => typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;

export const validateUserData = (req, res, next) => {
	const { fullName, email, password, userId } = req.body ?? {};
	if (!fullName || !email || !password || !userId) {
		return badRequest(res, 'All fields are required');
	}
	// Only plain strings are accepted, objects (e.g. {"$ne": null}) are rejected
	if (![fullName, email, password, userId].every((value) => typeof value === 'string')) {
		return badRequest(res, 'Invalid input');
	}
	if (!isNonEmptyString(fullName, 100)) {
		return badRequest(res, 'Invalid full name');
	}
	if (!isNonEmptyString(email, 254) || !EMAIL_REGEX.test(email)) {
		return badRequest(res, 'Invalid email address');
	}
	if (!USER_ID_REGEX.test(userId)) {
		return badRequest(res, 'User ID must be 3-30 characters (letters, numbers, ".", "_" or "-")');
	}
	if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
		return badRequest(res, `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`);
	}
	next();
};

export const validateLoginData = (req, res, next) => {
	const { email, password } = req.body ?? {};
	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return badRequest(res, 'Email and password are required');
	}
	if (email.length > 254 || password.length > PASSWORD_MAX_LENGTH) {
		return badRequest(res, 'Invalid input');
	}
	next();
};

export const verifyToken = async (req, res, next) => {
	const token = req.cookies?.[AUTH_COOKIE_NAME];
	if (typeof token !== 'string' || !token) {
		console.log(chalk.red('Auth cookie not found in request.'));
		return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Invalid session, Please login again.');
	}
	let decoded;
	try {
		decoded = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
	} catch (error) {
		console.error(chalk.red('Error: ', error?.name + ': ' + error?.message));
		if (error?.name === 'TokenExpiredError') {
			return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Session expired. Please login again.');
		} else if (error?.name === 'JsonWebTokenError') {
			return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Something went wrong, please login again.');
		} else {
			return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Authentication failed.');
		}
	}

	req.user = decoded;
	next();
};
