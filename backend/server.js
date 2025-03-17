const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = []; // Start with an empty users array

// Get all users
app.get("/users", (req, res) => res.json(users));

// Add new user
app.post("/users", (req, res) => {
  const { name, email, age, city } = req.body;
  if (!name || !email || !age || !city) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newUser = { id: users.length + 1, name, email, age, city };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let userFound = false;

  users = users.map(user => {
    if (user.id === id) {
      userFound = true;
      return { ...user, ...req.body };
    }
    return user;
  });

  if (userFound) {
    res.json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);

  if (users.length < initialLength) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Handle port conflicts
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

