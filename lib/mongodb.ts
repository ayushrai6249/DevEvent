import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize cache
let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  // 1. If already connected → return
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection in progress → create one
  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("DATABASE URL NOT FOUND!");
    }
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    // 3. Await connection
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
