// pages/api/auth/register.js
import bcrypt from "bcryptjs";

let users = []; // Simulating a user database for now

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the new user
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);

    return res.status(201).json({ message: "User registered successfully." });
  }

  return res.status(405).json({ message: "Method not allowed." });
}
