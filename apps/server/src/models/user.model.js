import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '#config/env';

const BCRYPT_ROUNDS = 12;

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
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
			trim: true,
			maxlength: 254,
		},
		password: {
			type: String,
			required: true,
			select: false, // never returned unless explicitly requested with .select('+password')
		},
		contactNo: {
			type: String,
			// unique: true,
		},
		refreshToken: {
			type: String,
			select: false,
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

	this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.password;
	delete user.refreshToken;
	delete user.__v;
	return user;
};

/** Signs a token holding only the minimum identity claims (no profile data / hashes) */
userSchema.methods.generateAccessToken = async function () {
	return jwt.sign({ sub: String(this._id), email: this.email }, env.JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: env.JWT_EXPIRES_IN,
	});
};

const User = mongoose.model('User', userSchema);

export default User;
