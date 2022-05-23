import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default {
    async createPost(req, res) {
        const { content } = req.body;
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (!user)
                return res.json({ message: "User does not exist" })

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id
                },
                include: {
                    author: true
                }
            })
            return res.json(post)
        } catch (error) {
            return res.json({ message: error.message })
        }
    },
    async findAllPosts(req, res) {
        try {
            const posts = await prisma.post.findMany()
            return res.json(posts)
        } catch (error) {
            return res.json(error)
        }
    },
    async updatePost(req, res) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            let post = await prisma.post.findUnique({ where: { id: Number(id) } })
            if(!post)
            return res.json({error: "Post does not exists"})

            post = await prisma.post.update({
                where: {id: Number(id)},
                data: {content}
            })
            return res.json(post)
        } catch (error) {
            return res.json({error})
        }
    }
}