export {};

// This file extends the Express Request interface to include a userId property
// This is useful for middleware that needs to attach user information to the request
declare global {
  namespace Express {
    export interface Request {
      userId?: number;
      cleanBody?: any;
      role: string;
    }
  }
}
