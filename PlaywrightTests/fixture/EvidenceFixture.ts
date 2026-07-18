import { test as diagnosticTest, expect, maskSensitiveData } from "./LoggerFixture";

type Evidence = Record<string, unknown>;

export const test = diagnosticTest.extend<{
  evidence: Evidence;
}>({
  evidence: async ({}, use, testInfo) => {
    const evidence: Evidence = {};

    await use(evidence);

    for (const [name, value] of Object.entries(evidence)) {
      if (value === undefined || value === null) {
        continue;
      }

      // Handle PNG / Buffer
      if (Buffer.isBuffer(value)) {
        await testInfo.attach(`${name}.png`, {
          body: value,
          contentType: "image/png",
        });

        continue;
      }

      // Handle JSON object or string
      const safeValue =
        typeof value === "string"
          ? value
          : value && typeof value === "object"
            ? maskSensitiveData(value as Record<string, unknown>)
            : value;

      await testInfo.attach(`${name}.json`, {
        body:
          typeof safeValue === "string"
            ? JSON.stringify(safeValue)
            : JSON.stringify(safeValue, null, 2),
        contentType: "application/json",
      });
    }
  },
});

export { expect };