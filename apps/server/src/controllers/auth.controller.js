import User from '#models/user';
import { sendResponse } from '#utils/general';
import httpStatus from 'http-status';

export const signup = async (req, res) => {
	const { fullName, email, password, userId } = req.body;

	try {
		const user = await User.create({
			fullName,
			email,
			password,
			userId,
		});

		const createdUser = await User.findOne({ userId }).select(' -_id -password -__v ');

		console.log('User created successfully', createdUser);

		sendResponse(res, httpStatus.CREATED, createdUser, 'User created successfully', null);
	} catch (error) {
		console.log('Error while creating user:', error);
		return res.status(500).json({
			success: false,
			message: 'Error while creating user',
			error,
		});
	}
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      sendResponse(res, httpStatus.NOT_FOUND, null, 'User not found', null);
    }
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) {
      sendResponse(res, httpStatus.UNAUTHORIZED, null, 'Invalid password', null);
    }
    if(user) {
      const token = await user.generateAccessToken(user);
      sendResponse(res, httpStatus.OK, user, 'Login successful', token);
    }
  } catch (error) {
    throw {
      status: false,
      message: 'Error while login user',
      httpStatus: httpStatus.INTERNAL_SERVER_ERROR
    }
  }
};
