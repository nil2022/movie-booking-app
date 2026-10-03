import mongoose from 'mongoose';
import env from '#config/env';

// Treat any `$operator` inside user-supplied filters as a literal value (NoSQL injection guard)
mongoose.set('sanitizeFilter', true);
// Reject query filters on fields that are not in the schema
mongoose.set('strictQuery', true);

export default async function connectDatabase() {
	const connectionTime = Date.now();
	const response = await mongoose.connect(env.DB_URL);
	const responseTime = Date.now() - connectionTime;
	console.log(`Connected to MongoDB Host:->>[${response.connection.host}] in ${responseTime} ms`);
}
