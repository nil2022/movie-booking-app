import mongoose from "mongoose";

export default async function connectDatabase() {
  const connectionTime = Date.now();
  const response = await mongoose.connect(process.env.DATABASE_URL);
  const responseTime = Date.now() - connectionTime;
  console.log(
    `Connected to MongoDB Host:->>[${response.connection.host}] in ${responseTime} ms`
  );
}
