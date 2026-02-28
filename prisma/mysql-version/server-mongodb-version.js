const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

/* ================= GET ALL USERS ================= */

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= CREATE USER ================= */

app.post("/create", async (req, res) => {
  try {
    const { name, address, telephone } = req.body;

    const user = await prisma.user.create({
      data: { name, address, telephone },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET USER BY ID ================= */

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id; // in mysql -> const id = parseInt(req.params.id); bcz id is int, but in mongodb id is string

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= UPDATE USER ================= */

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id; // in mysql -> const id = parseInt(req.params.id); bcz id is int, but in mongodb id is string
    const { name, address, telephone } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, address, telephone },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= DELETE USER ================= */

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id; // in mysql -> const id = parseInt(req.params.id); bcz id is int, but in mongodb id is string

    await prisma.user.delete({
      where: { id },
    });

    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
