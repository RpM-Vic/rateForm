import rateLimit from 'express-rate-limit';


// Stricter rate limiter for login 
export const Limiter = rateLimit({
  windowMs: 6*60 * 60 * 1000, // 6 horas
  max: 12, 
  message: 'Too many failed attempts, try again later',
});
