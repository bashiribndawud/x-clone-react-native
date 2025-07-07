import { arcjetConfig } from "../config/arcjet.js";

//Arcjet middleware to protect against attacks and bots
export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await arcjetConfig.protect(req, { requested: 5 });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot Detected",
          message: "Access denied: Bot detected",
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access denied by security policies",
        });
      }
    }

    //check for spoofed bots
    if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
       return res.status(403).json({
            error: "Spoofed Bot Detected",
            message: "Access denied: Spoofed bot detected",
        });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    //allow request to continue if Arcjet fails
    next();
  }
};
