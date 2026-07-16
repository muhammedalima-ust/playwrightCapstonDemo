import dotenv from "dotenv";
 
dotenv.config();
 
export class Secrets {
  static get(key: string): string {
    const value =
      process.env[key.toUpperCase()] ??
      process.env[key];
 
    if (!value) {
      throw new Error(`Missing secret: ${key}`);
    }
 
    return value;
  }
}