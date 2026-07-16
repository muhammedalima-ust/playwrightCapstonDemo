// import winston from "winston";
 
// const sensitiveKeys = new Set([
//   "authorization",
//   "cardnumber",
//   "cvv",
//   "password",
//   "token",
// ]);
 
// export function redactForLog(value: unknown): unknown {
//   if (Array.isArray(value)) {
//     return value.map(redactForLog);
//   }
//   if (!value || typeof value !== "object") {
//     return value;
//   }
//   return Object.fromEntries(
//     Object.entries(value).map(([key, fieldValue]) => [
//       key,
//       sensitiveKeys.has(key.toLowerCase()) ? "[REDACTED]" : redactForLog(fieldValue),
//     ])
//   );
// }
 
// const redactSensitiveFields = winston.format((info) => {
//   for (const [key, value] of Object.entries(info)) {
//     if (sensitiveKeys.has(key.toLowerCase())) {
//       info[key] = "[REDACTED]";
//     } else {
//       info[key] = redactForLog(value);
//     }
//   }
//   return info;
// });
 
// const { combine, errors, timestamp, printf } = winston.format;
 
// // Pretty multi-line format for console readability
// const prettyConsoleFormat = printf((info) => {
//   const { level, message, timestamp: ts, ...meta } = info;
//   const lines = [`[${ts}] ${String(level).toUpperCase()}  ${message}`];
//   for (const [key, value] of Object.entries(meta)) {
//     if (value === undefined) continue;
//     lines.push(`    ${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`);
//   }
//   return lines.join("\n");
// });
 
// export const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL ?? "info",
//   format: combine(redactSensitiveFields(), timestamp(), errors({ stack: true })),
//   defaultMeta: {
//     service: "sdet-retail-playwright",
//   },
//   transports: [
//     new winston.transports.Console({
//       format: combine(timestamp(), prettyConsoleFormat),
//     }),
//   ],
// });
 
// export type AppLogger = typeof logger;
import winston from "winston";
 
const { combine, timestamp, printf } = winston.format;
 
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()} ${message}`;
});
 
export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
  ],
});
 
export type AppLogger = typeof logger;
 