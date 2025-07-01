import express from 'express';
import logger from 'morgan';
import authRoutes from '#routes/auth';
import cors from 'cors';
import env from '#config/env';
import httpStatus from 'http-status';
import { sendResponse } from '#utils/general';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(logger('dev'));
app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: httpStatus.NO_CONTENT
	})
);

app.use('/api/v1/auth', authRoutes);

/***************************************/
/********* HEALTH CHECK ROUTE **********/
/***************************************/
app.get('/', (req, res) => {
	sendResponse(res, httpStatus.OK, null, 'Movie booking server is up and running');
});

export default server;