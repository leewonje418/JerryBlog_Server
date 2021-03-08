import express from 'express';
import Post from '../../models/post';

const router = express.Router();

router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, 'All Post Get');
    res.json(postFindResult);
})

router.post('/', async(req, res, next) => {
    try {
        console.log(req, 'req');
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