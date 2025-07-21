import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  // This middleware validates the request body against the provided Zod schema
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
}
