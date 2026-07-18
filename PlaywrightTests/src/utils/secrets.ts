import dotenv from "dotenv";
 
dotenv.config();
 
export class secrets {
  static get(key: string): string {
    const value =
      process.env[key.toUpperCase()] ??
      process.env[key];
 
    if (!value) {
      throw new Error(`Missing secret: ${key}`);
    }
    return value;
  }

  static getuserPassword(key: string): string {
    const value =
      process.env[`MUHAMMED_${key.toLowerCase()}_PASSWORD`] ??
      process.env[key];
 
    if (!value) {
      throw new Error(`Missing secret: ${key}`);
    }
    return value;
  }

}