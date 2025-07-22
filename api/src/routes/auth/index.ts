import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

// Register endpoint
router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    // Hash the password before saving it to the database (encrypting the password)
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    // @ts-ignore
    delete user.password; // Remove password from response for security
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

// Login endpoint
router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    console.log(user);
    if (!user) {
      res.status(401).send({ message: "Authentication failed" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "Authentication failed" });
      return;
    }

    // create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password; // Remove password from response for security
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
