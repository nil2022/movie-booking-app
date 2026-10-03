// Landlord .env Configuration
import { str, num, bool, cleanEnv, port, makeValidator } from 'envalid';
import dotenv from '@dotenvx/dotenvx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../', '../', '.env');
dotenv.config({ path: envPath });

const envVariables = process.env;

/** JWT secret must be long enough to resist brute-forcing of HS256 signatures */
const jwtSecret = makeValidator((value) => {
	if (typeof value !== 'string' || value.length < 32) {
		throw new Error('must be at least 32 characters long');
	}
	return value;
});

const env = cleanEnv(envVariables, {
	//Server Config
	SERVER_PORT: port(),
	BACKEND_URL: str(),
	NODE_ENV: str({ choices: ['dev', 'production'], default: 'dev' }),
	// Number of reverse-proxy hops in front of the app (needed for correct client IP / rate limiting)
	TRUST_PROXY: num({ default: 0 }),

	/** Email Config */
	EMAIL_HOST_NAME: str(),
	EMAIL_PORT_NUMBER: port(),
	EMAIL_AUTH_SECURE: bool(),
	EMAIL_AUTH_USER: str(),
	EMAIL_AUTH_PASSWORD: str(),
	EMAIL_FROM_USER: str(),

	// Database Config
	DB_URL: str(),

	// Session Token Config
	JWT_SECRET: jwtSecret(),
	JWT_EXPIRES_IN: str({ default: '2h' }), // 2hours

	// CORS Config (comma separated list of allowed origins)
	CORS_ORIGIN: str(),
});

if (env.CORS_ORIGIN.split(',').some((origin) => origin.trim() === '*')) {
	throw new Error('CORS_ORIGIN must list explicit origins; wildcard "*" is not allowed');
}

export default env;