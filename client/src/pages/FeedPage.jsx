import { useEffect, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';
import PostComposer from '../components/PostComposer';
import { useAuth } from '../context/AuthContext';

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (err) {
      setError('Unable to load posts right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (content) => {
    const { data } = await api.post('/posts', { content });
    setPosts((current) => [data, ...current]);
  };

  const handleLike = async (postId) => {
    const { data } = await api.patch(`/posts/${postId}/like`);
    setPosts((current) => current.map((post) => (post._id === postId ? data : post)));
  };

  return (
    <section className="feed-page">
      <div className="hero card">
        <h1>Build your own MERN social media platform</h1>
        <p>
          This starter demonstrates authentication, posting, and feed interactions so you can extend it with
          profiles, comments, follows, chat, and media uploads.
        </p>
      </div>

      {user ? <PostComposer onSubmit={handleCreatePost} /> : null}

      {loading ? <p>Loading posts...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <div className="feed-list">
        {posts.map((post) => (
          <PostCard
            isAuthenticated={Boolean(user)}
            key={post._id}
            onLike={handleLike}
            post={post}
          />
        ))}
      </div>
    </section>
  );
};

export default FeedPage;
