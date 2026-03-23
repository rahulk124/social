import Post from '../models/Post.js';

export const getPosts = async (_req, res) => {
  const posts = await Post.find()
    .populate('author', 'name email avatar')
    .sort({ createdAt: -1 });

  return res.json(posts);
};

export const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content?.trim()) {
    return res.status(400).json({ message: 'Post content is required' });
  }

  const post = await Post.create({
    author: req.user._id,
    content: content.trim(),
  });

  const populatedPost = await post.populate('author', 'name email avatar');
  return res.status(201).json(populatedPost);
};

export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const alreadyLiked = post.likes.some((like) => like.toString() === req.user._id.toString());

  if (alreadyLiked) {
    post.likes = post.likes.filter((like) => like.toString() !== req.user._id.toString());
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();
  const updatedPost = await Post.findById(post._id).populate('author', 'name email avatar');
  return res.json(updatedPost);
};
