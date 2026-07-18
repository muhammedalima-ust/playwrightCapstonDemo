import dotenv from "dotenv";

const envConfig = dotenv.config().parsed ?? {};

export class secrets {

  static get(key: string): string {
    const envKey = key.toUpperCase();

    const ciValue = process.env[envKey];

    if (ciValue?.trim()) {
      return ciValue;
    }

    const envValue = envConfig[envKey];

    if (envValue?.trim()) {
      return envValue;
    }

    return "";
  }

  static getuserPassword(key: string): string {
    const envKey = `MUHAMMED_${key.toUpperCase()}_PASSWORD`;

    const ciValue = process.env[envKey];

    if (ciValue?.trim()) {
      return ciValue;
    }

    const envValue = envConfig[envKey];

    if (envValue?.trim()) {
      return envValue;
    }

    return "";
  }
}