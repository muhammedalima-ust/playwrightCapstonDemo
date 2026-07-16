import { test as diagnosticTest, expect } from "./LoggerFixture";

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
      await testInfo.attach(`${name}.json`, {
        body:
          typeof value === "string"
            ? JSON.stringify(value)
            : JSON.stringify(value, null, 2),
        contentType: "application/json",
      });
    }
  },
});

export { expect };