import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import authRoutes from '#routes/auth';
import cors from 'cors';
import env from '#config/env';
import httpStatus from 'http-status';
import { sendResponse } from '#utils/general';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
if (env.TRUST_PROXY > 0) {
	app.set('trust proxy', env.TRUST_PROXY);
}

app.use(helmet());
app.use(logger(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/** Generic per-IP throttle for every route */
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		limit: 300,
		standardHeaders: 'draft-7',
		legacyHeaders: false,
	})
);

app.use(express.json({ limit: '16kb' }));
// `extended: false` -> no nested objects from query strings (blocks `email[$ne]=x` style NoSQL injection)
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

const allowedOrigins = env.CORS_ORIGIN.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);
app.use(
	cors({
		// Explicit allow-list only (wildcards are rejected in env.config)
		origin: allowedOrigins,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		preflightContinue: false,
		optionsSuccessStatus: httpStatus.NO_CONTENT,
	})
);

app.use('/api/v1/auth', authRoutes);

/***************************************/
/********* HEALTH CHECK ROUTE **********/
/***************************************/
app.get('/', (req, res) => {
	sendResponse(res, httpStatus.OK, null, 'Movie booking server is up and running');
});

app.use((req, res) => {
	sendResponse(res, httpStatus.NOT_FOUND, null, 'Route not found');
});

// Central error handler: never leak stack traces / internals to the client
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if (err?.type === 'entity.parse.failed') {
		return sendResponse(res, httpStatus.BAD_REQUEST, null, 'Malformed request body');
	}
	if (err?.type === 'entity.too.large') {
		return sendResponse(res, httpStatus.REQUEST_ENTITY_TOO_LARGE, null, 'Request body too large');
	}
	console.error('Unhandled error:', err);
	return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, 'Internal server error');
});

export default server;
