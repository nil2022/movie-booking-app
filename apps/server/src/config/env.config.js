// Landlord .env Configuration
import { str, num, bool, cleanEnv, port } from 'envalid';
import dotenv from '@dotenvx/dotenvx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../', '../', '.env');
dotenv.config({ path: envPath });

const envVariables = process.env;

const env = cleanEnv(envVariables, {
	//Server Config
	SERVER_PORT: port(),
	BACKEND_URL: str(),
	NODE_ENV: str({ choices: ['dev', 'production'], default: 'dev' }),

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
	JWT_SECRET: str(),
	JWT_EXPIRES_IN: str({ default: '2h' }), // 2hours

	// CORS Config
	CORS_ORIGIN: str(),
});

export default env;