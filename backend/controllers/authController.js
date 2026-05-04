import bcrypt from "bcrypt";
import { users } from "../data/users.js";
import jwt from "jsonwebtoken";


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );
};


export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check missing
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check existing user
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone: phone || "00000000",
      password: hashedPassword,
      role: "user",
    };

    users.push(newUser);

    const token = generateToken(newUser);

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.role === "user");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.role === "staff");

    if (!user) {
      return res.status(401).json({ message: "Invalid staff login" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid staff login" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};