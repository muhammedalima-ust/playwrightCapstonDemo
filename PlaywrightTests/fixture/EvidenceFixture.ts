import { test as diagnosticTest, expect } from "./LoggerFixture";
 
type Evidence = Record<string, unknown>;
 
export const test = diagnosticTest.extend<{
  evidence: Evidence;
}>({
  evidence: async ({}, use, testInfo) => {
    const evidence: Evidence = {};
    await use(evidence);
 
    for (const [name, value] of Object.entries(evidence)) {
      if (value === undefined) {
        continue;
      }
      const isText = typeof value === "string";
      await testInfo.attach(`${name}.${isText ? "txt" : "json"}`, {
        body: isText ? value : JSON.stringify(value, null, 2),
        contentType: isText ? "text/plain" : "application/json",
      });
    }
  },
});
 
export { expect };