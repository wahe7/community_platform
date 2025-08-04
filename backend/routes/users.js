const express = require("express");
const router = express.Router();

const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
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
            authorId: parseInt(userId),
          },
        });

        return res.status(200).json({user, posts});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;