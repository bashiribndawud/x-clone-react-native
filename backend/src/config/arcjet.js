import arcjet, { tokenBucket, shield, detectBot } from "arcjet";
import { ENV } from "../config/env.js";

//initalize arcjet with secret rules
export const arcjetConfig = arcjet({
  key: ENV.ARCJET_KEY,
  client: "x-clone-backend",
  log: console,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }), //protect against attacks like SQL injection, XSS, CSRF etc.
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }), //detect and block bots
    tokenBucket({
      mode: "LIVE",
      capacity: 15,
      interval: 10,
      refillRate: 10,
    }),
  ],
});
