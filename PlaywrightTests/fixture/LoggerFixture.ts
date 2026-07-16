// import { test as base, expect,Page } from "@playwright/test";
// import crypto from "node:crypto";
// import { type AppLogger, logger, redactForLog } from "../src/logger";
// import { SearchPage } from "../pages/SearchPage";
// import { AddToCart } from "../pages/AddToCart";
 
// type DiagnosticFixtures = {
//   correlationId: string;
//   log: AppLogger;
//   search: SearchPage;
//   add: AddToCart;
// };
 
// export const test = base.extend<DiagnosticFixtures>({
//   correlationId: async ({}, use) => {
//     await use(crypto.randomUUID());
//   },
 
//   log: async ({ page, correlationId }, use, testInfo) => {
//     await page.setExtraHTTPHeaders({ "x-correlation-id": correlationId });
 
//     const baseMeta = {
//       correlationId,
//       project: testInfo.project.name,
//       service: "sdet-retail-playwright",
//       specFile: testInfo.file,
//       testId: testInfo.title,
//       workerIndex: testInfo.workerIndex,
//     };
 
//     const log = logger.child(baseMeta);
//     const lines: string[] = [];
//     const diagnosticLog = log as AppLogger & Record<string, unknown>;
 
//     for (const level of ["error", "warn", "info", "http", "debug"] as const) {
//       const originalLevelMethod = (
//         log[level] as unknown as (message: string, meta?: Record<string, unknown>) => unknown
//       ).bind(log);
 
//       diagnosticLog[level] = ((message: string, meta: Record<string, unknown> = {}) => {
//         if (log.isLevelEnabled(level)) {
//           lines.push(
//             JSON.stringify(
//               redactForLog({
//                 ...baseMeta,
//                 ...meta,
//                 level,
//                 message,
//                 timeStamp: new Date().toISOString(),
//               })
//             )
//           );
//           originalLevelMethod(message, meta);
//         }
//         return diagnosticLog;
//       }) as any;
//     }
 
//     diagnosticLog.info("test started");
//     await use(diagnosticLog as AppLogger);
//     diagnosticLog.info("test finished", { status: testInfo.status ?? "unknown" });
 
//     if (lines.length > 0) {
//       const rows = lines.map((line, i) => {
//         const parsed = JSON.parse(line);
//         const time = new Date(parsed.timeStamp).toISOString().split("T")[1].replace("Z", "");
//         return { Step: i + 1, Timestamp: time, Message: parsed.message };
//       });
 
//       console.log(`\nExecution Timeline — ${testInfo.title}`);
//       console.log(`Status: ${(testInfo.status ?? "unknown").toUpperCase()}\n`);
//       console.table(rows);
//     }
 
//     if (testInfo.status !== testInfo.expectedStatus && lines.length > 0) {
//       await testInfo.attach("diagnostic-log.json", {
//         body: lines.join("\n"),
//         contentType: "application/json",
//       });
//     }
//   },
 
//   search: async ({ page }, use) => {
//     await use(new SearchPage(page));
//   },
 
//   add: async ({ page }, use) => {
//     await use(new AddToCart(page));
//   },
// });
 
// export { expect };
 
// import { test as base, expect } from "@playwright/test";
// import fs from "fs";
// import path from "path";
// import { logger, AppLogger } from "../src/logger";
 
// type LogEntry = {
//   step: number;
//   timestamp: string;
//   message: string;
// };
 
// type DiagnosticFixtures = {
//   log: AppLogger;
// };
 
// export const test = base.extend<DiagnosticFixtures>({
//   log: async ({}, use, testInfo) => {
//     const timeline: LogEntry[] = [];
//     let step = 1;
 
//     const diagnosticLog = logger.child({});
 
//     const originalInfo = diagnosticLog.info.bind(diagnosticLog);
 
//     diagnosticLog.info = ((message: string) => {
//       timeline.push({
//         step: step++,
//         timestamp: new Date().toLocaleTimeString("en-GB", {
//           hour12: false,
//         }),
//         message,
//       });
 
//       originalInfo(message);
//       return diagnosticLog;
//     }) as any;
 
//     diagnosticLog.info("Test Started");
 
//     await use(diagnosticLog);
 
//     diagnosticLog.info(`Test ${testInfo.status}`);
 
//     console.log(`\nExecution Timeline — ${testInfo.title}\n`);
 
//     console.table(
//       timeline.map((entry) => ({
//         Step: entry.step,
//         Timestamp: entry.timestamp,
//         Message: entry.message,
//       }))
//     );
 
//     const txtContent = timeline
//       .map(
//         (entry) =>
//           `${entry.step}. [${entry.timestamp}] ${entry.message}`
//       )
//       .join("\n");
 
//     const fileName = `${testInfo.title.replace(/\s+/g, "_")}-log.txt`;
 
//     fs.writeFileSync(
//       path.join(process.cwd(), fileName),
//       txtContent,
//       "utf8"
//     );
 
//     await testInfo.attach("execution-log.txt", {
//       body: txtContent,
//       contentType: "text/plain",
//     });
//   },
// });
 
// export { expect };
 
import { test as base, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { logger, AppLogger } from "../src/logger/Logger";
import { level } from "winston";
 
type LogEntry = {
  step: number;
  timestamp: string;
  message: string;
};
 
type DiagnosticFixtures = {
  log: AppLogger;
};
 
export const test = base.extend<DiagnosticFixtures>({
  log: async ({ }, use, testInfo) => {
    const timeline: LogEntry[] = [];
    let step = 1;
 
    const diagnosticLog = logger.child({});
 
    const originalInfo = diagnosticLog.info.bind(diagnosticLog);
 
    diagnosticLog.info = ((message: string) => {
      
            const entry = {
                step: step++,
                timestamp: new Date().toLocaleTimeString("en-GB", {
                  hour12: false,
                }),
                message,
              };

              timeline.push(entry);

              console.log(
                `[${level.toUpperCase()} - ${entry.timestamp}] ${entry.message}`
              );


 
      // originalInfo(message);
      return diagnosticLog;
    }) as any;
 
    diagnosticLog.info("Test Started");
 
    await use(diagnosticLog);
 
    diagnosticLog.info(`Test ${testInfo.status}`);
 
    console.log(`\nExecution Timeline — ${testInfo.title}\n`);
 
    console.table(
      timeline.map((entry) => ({
        Step: entry.step,
        Timestamp: entry.timestamp,
        Message: entry.message,
      }))
    );
 
    const txtContent = timeline
      .map(
        (entry) =>
          `${entry.step}. [${entry.timestamp}] ${entry.message}`
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
 
    await testInfo.attach("execution-log.txt", {
      body: txtContent,
      contentType: "text/plain",
    });
  },
});
 
export { expect };