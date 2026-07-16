import * as fs from "fs";
import * as path from "path";

export class Secrets {
    private static readonly DEFAULT_FILE = "secrets.local.properties";

    private constructor() {}

    public static find(key: string): string | undefined {
        const environmentKey = key.replace(/\./g, "_").toUpperCase();

        // 1. Check environment variable
        const environmentValue = process.env[environmentKey]?.trim();

        if (environmentValue) {
            return environmentValue;
        }

        // 2. Check local properties file
        const filePath = path.resolve(
            process.env.SECRETS_FILE || this.DEFAULT_FILE
        );

        if (!fs.existsSync(filePath)) {
            return undefined;
        }

        const content = fs.readFileSync(filePath, "utf8");

        const properties = this.parseProperties(content);

        return properties[key]?.trim() || undefined;
    }

    public static required(key: string): string {
        const value = this.find(key);

        if (!value) {
            const environmentKey =
                key.replace(/\./g, "_").toUpperCase();

            throw new Error(
                `Missing secret '${key}'. ` +
                `Set environment variable '${environmentKey}' ` +
                `or add it to '${this.DEFAULT_FILE}'.`
            );
        }

        return value;
    }

    private static parseProperties(
        content: string
    ): Record<string, string> {

        const properties: Record<string, string> = {};

        for (const line of content.split(/\r?\n/)) {

            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith("#")) {
                continue;
            }

            const separatorIndex = trimmed.indexOf("=");

            if (separatorIndex === -1) {
                continue;
            }

            const key = trimmed
                .substring(0, separatorIndex)
                .trim();

            const value = trimmed
                .substring(separatorIndex + 1)
                .trim();

            properties[key] = value;
        }

        return properties;
    }
}