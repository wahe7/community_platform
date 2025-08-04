const express = require("express");
const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");


// create post
router.post("/", authenticateToken, async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user.id;

    if (!title || !content ) {
        return res.status(400).json({message: "Title and content are required"});
    }
    try {
        const post = await prisma.post.create({
            data: {
              title,
              content,
              authorId: userId,
            },
        });
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

// get post
router.get("/", authenticateToken, async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author:{
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    bio: true,
                  },
                },
            },
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;
