import session from "express-session";
import connectRedis from "connect-redis";
import redis from "../redis";

const RedisStore = connectRedis(session); // Redis store for session

session({
  secret: process.env.SESSION_SECRET as string,
  name: "COOKIE_NAME",
  store: new RedisStore({
    client: redis,
    disableTouch: true, // Touch keeps the session alive whenever the user interact with the server so i'm disabling it.
  }),
  proxy: true,
  resave: false, //
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 24h
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // use https in production
  },
});

export { session };
