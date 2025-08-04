const express = require("express");
const router = express.Router();

const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.user.id)
            },
            select:{
              name: true,
              email: true,
              bio: true,
            }
        });

        if (!user) {
          return res.status(404).json({message: "User not found"});
        }

        const posts = await prisma.post.findMany({
          where: {
            authorId: parseInt(req.user.id),
          },
        });

        return res.status(200).json({user, posts});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;