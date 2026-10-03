import bcrypt from 'bcrypt';
import User from '#models/user';
import { sendResponse } from '#utils/general';
import httpStatus from 'http-status';

const MONGO_DUPLICATE_KEY = 11000;
// Used to keep response time constant when the email does not exist (prevents user enumeration by timing)
const DUMMY_HASH = bcrypt.hashSync('dummy-password-for-timing', 12);

export const signup = async (req, res) => {
	const { fullName, email, password, userId } = req.body;

	try {
		const user = await User.create({
			fullName,
			email,
			password,
			userId,
		});

		const createdUser = await User.findById(user._id).select(' -_id -password -refreshToken -__v ');

		sendResponse(res, httpStatus.CREATED, createdUser, 'User created successfully', null);
	} catch (error) {
		if (error?.code === MONGO_DUPLICATE_KEY) {
			return sendResponse(res, httpStatus.CONFLICT, null, 'A user with this email or user ID already exists');
		}
		if (error?.name === 'ValidationError') {
			return sendResponse(res, httpStatus.BAD_REQUEST, null, 'Invalid user data');
		}
		console.error('Error while creating user:', error);
		return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, 'Error while creating user');
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

		// Same status + message for "unknown email" and "wrong password"
		const isPasswordValid = user ? await user.comparePassword(password) : await bcrypt.compare(password, DUMMY_HASH);
		if (!user || !isPasswordValid) {
			return sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Invalid email or password', null);
		}

		const token = await user.generateAccessToken();
		return sendResponse(res, httpStatus.OK, user, 'Login successful', token);
	} catch (error) {
		console.error('Error while login user:', error);
		return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, 'Error while login user');
	}
};

export const getUser = async (req, res) => {
	try {
		const data = await User.findById(req.user?.sub);
		if (!data) {
			return sendResponse(res, httpStatus.NOT_FOUND, null, 'User not found', null);
		}
		// A user may only read their own profile
		if (req.params.id !== String(data._id) && req.params.id !== data.userId) {
			return sendResponse(res, httpStatus.FORBIDDEN, null, 'Forbidden', null);
		}
		return sendResponse(res, httpStatus.OK, data, 'User found successfully', null);
	} catch (error) {
		console.error('Error while getting user:', error);
		return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, 'Error while getting user');
	}
};
