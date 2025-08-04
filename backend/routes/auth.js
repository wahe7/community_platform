const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
    const {name, email, password, bio} = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                bio: bio || "",
            },
        });
        return res.status(201).json("User registered successfully");
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await prisma.user.findUnique({
      where: {
          email,
      },
    });
    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return res.status(200).json({token});
});

module.exports = router;
