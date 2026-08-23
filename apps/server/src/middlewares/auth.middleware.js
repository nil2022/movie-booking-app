import env from '#config/env';
import { sendResponse } from '#utils/general';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chalk from 'chalk';

export const validateUserData = (req, res, next) => {
	const { fullName, email, password, userId } = req.body;
	if (!fullName || !email || !password || !userId) {
		return res.status(400).json({
			success: false,
			message: 'All fields are required',
		});
	}
	next();
};

export const verifyToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'] || req.headers['cookie']?.split('=')[1];
	const token = (authHeader && authHeader.split(' ')[1]) || authHeader;
	if (!token) {
		console.log(chalk.red('Token not found in request headers or cookies.'));
		return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Invalid session, Please login again.');
	}
	let decoded;
	try {
		decoded = jwt.verify(token, env.JWT_SECRET);
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
