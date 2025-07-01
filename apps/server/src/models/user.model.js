import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '#config/env';

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		contactNo: {
			type: String,
			// unique: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

userSchema.methods.generateAccessToken = async (payload) => {
	return jwt.sign({ payload }, env.JWT_SECRET, {
		expiresIn: '1d',
	});
};

const User = mongoose.model('User', userSchema);

export default User;
