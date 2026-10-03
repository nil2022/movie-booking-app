import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import env from '#config/env';

/**
 * Sends a response with the provided data and status code.
 *
 * @param {Object} res - The response object
 * @param {number} statusCode - The status code of the response
 * @param {Object} data - The data to be sent in the response
 * @param {string} - An optional message to include in the response
 * @return {Object} The JSON response object
 */
export const sendResponse = (res, statusCode, data, message, token) => {
	const response = {
		status: statusCode < 400 ? true : false,
		...(message ? { message } : {}),
		...(data
			? Array.isArray(data.data)
				? {
						data: data?.data,
						total: data.total,
						currentCount: data.currentCount,
					}
				: Array.isArray(data.results)
					? {
							data: data?.results,
							total: data.total,
							currentCount: data.currentCount,
						}
					: { data } // Simply include data as-is for non-paginated case
			: {}),
		...(token ? { token } : {}),
	};
	return res.status(statusCode).json(response);
};

/** Auth cookie (HttpOnly so client-side JS / XSS can never read the session token) */
export const AUTH_COOKIE_NAME = 'token';

const authCookieBaseOptions = () => ({
	httpOnly: true,
	// SameSite=None is only accepted by browsers together with Secure
	secure: env.NODE_ENV === 'production' || env.COOKIE_SAMESITE === 'none',
	sameSite: env.COOKIE_SAMESITE,
	path: '/',
});

export const setAuthCookie = (res, token) => {
	const { exp } = jwt.decode(token);
	res.cookie(AUTH_COOKIE_NAME, token, { ...authCookieBaseOptions(), maxAge: exp * 1000 - Date.now() });
};

export const clearAuthCookie = (res) => {
	res.clearCookie(AUTH_COOKIE_NAME, authCookieBaseOptions());
};

// Connection URL — replace with your own as needed
const url = env.DB_URL;
const client = new MongoClient(url);

// Database name — replace with your own as needed
const dbName = 'movie-booking';

/**
 * Connects to MongoDB, ensures the database exists (by touching it), then closes the connection.
 */
export async function createDbIfNotPresent() {
	try {
		// Connect to the MongoDB server
		await client.connect();
		console.log('[MongoDB] Connected successfully to server');

		// Get a reference to the database — creates it if it doesn't exist yet
		const db = client.db(dbName);

		// Optionally touch the database by creating a dummy collection and immediately deleting it,
		// because MongoDB creates the database lazily on first write:
		const tempCollectionName = '__init';
		await db.createCollection(tempCollectionName);
		await db.collection(tempCollectionName).drop();

		console.log(`[MongoDB] Database "${dbName}" is ready`);

		return { success: true, message: `Database "${dbName}" created (or already present)` };
	} catch (err) {
		console.error('[MongoDB] Error during DB creation:', err);
		throw err;
	} finally {
		// Always close the client connection
		await client.close();
		// console.log('[MongoDB] Connection closed');
	}
}
