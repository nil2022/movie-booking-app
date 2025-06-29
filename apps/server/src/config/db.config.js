import mongoose from "mongoose";
import env from '#config/env';

export default async function connectDatabase() {
  const connectionTime = Date.now();
  const response = await mongoose.connect(env.DB_URL);
  const responseTime = Date.now() - connectionTime;
  console.log(
    `Connected to MongoDB Host:->>[${response.connection.host}] in ${responseTime} ms`
  );
}
