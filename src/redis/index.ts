import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", () => {
  console.error("\x1b[31m", "Can't connect to redis");
  process.exit(1);
});
redis.on("connect", () => {
  console.log("Connected successfully to redis");
});

export default redis;
