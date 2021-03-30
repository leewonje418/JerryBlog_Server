import express from 'express';
import Post from '../../models/post';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    res.json(postFindResult);
})

router.post('/', auth, async (req, res, next) => {
    try {
        const { title, content, fileUrl, creator } = req.body;
        const newPost = await Post.create({
            title, content, fileUrl, creator
        });
        res.json(newPost);
    } catch (error) {
        console.log(error);
    }
})

export default router;