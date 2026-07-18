import { test as base, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { logger, AppLogger } from "../src/logger/logger";
import { level } from "winston";
 
type LogEntry = {
  timestamp: string;
  message: string;
  maskedData?: Record<string, unknown>;
};
 
type DiagnosticFixtures = {
  log: AppLogger;
};

const SENSITIVE_DATA_MASK = "[SENSITIVE_DATA_MASKED]";

export function maskSensitiveData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const sensitiveKeys = [
    "password",
    "token",
    "secret",
    "apikey",
    "api_key",
    "authorization",
    "cardnumber",
    "cardexpiry",
    "nameoncard",
    "cvv",
    "usernumber",
    "pnr"
  ];

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        return [key, SENSITIVE_DATA_MASK];
      }

      return [key, value];
    })
  );
}
 
export const test = base.extend<DiagnosticFixtures>({
  log: async ({ }, use, testInfo) => {
    const timeline: LogEntry[] = [];
 
    const diagnosticLog = logger.child({});
 
    diagnosticLog.info = ((message: string, meta: Record<string, unknown> = {}) => {
          const maskedData =  Object.keys(meta).length !== 0 ? maskSensitiveData(meta) : undefined;
        

              const entry: LogEntry = {
                timestamp: new Date().toLocaleTimeString("en-GB", {
                  hour12: false,
                }),
                message,
                maskedData,
              };
              timeline.push(entry);

              console.log(
                `[${level.toUpperCase()} - ${entry.timestamp}] ${entry.message} ${entry.maskedData
                                                                                          ? `\n${Object.entries(entry.maskedData)
                                                                                          .map(([key, value]) => `${key}: ${String(value)}`)
                                                                                          .join("\n")}`
                                                                                          : ""}`
              );
      return diagnosticLog;
    }) as any;
 
    diagnosticLog.info("Test Started");
 
    await use(diagnosticLog);
 
    diagnosticLog.info(`Test ${testInfo.status}`);
 
    console.log(`\nExecution Timeline — ${testInfo.title}\n`);
 
    const txtContent = timeline
      .map(
        (entry) =>
          `[${level.toUpperCase()} - ${entry.timestamp}] ${entry.message} {${entry.maskedData}`
      )
      .join("\n");
 
    const logsDir = path.join(process.cwd(), "logs");
 
    fs.mkdirSync(logsDir, { recursive: true });
 
    const fileName = `${testInfo.title.replace(/\s+/g, "_")}-log.txt`;
 
    fs.writeFileSync(
      path.join(logsDir, fileName),
      txtContent,
      "utf8"
    );
  },
});
 
export { expect };