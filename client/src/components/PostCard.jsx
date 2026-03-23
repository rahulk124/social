const PostCard = ({ post, isAuthenticated, onLike }) => {
  const createdDate = new Date(post.createdAt).toLocaleString();

  return (
    <article className="card post-card">
      <div className="post-card__header">
        <div>
          <h3>{post.author?.name || 'Unknown user'}</h3>
          <p>{post.author?.email}</p>
        </div>
        <span>{createdDate}</span>
      </div>
      <p className="post-card__content">{post.content}</p>
      <div className="post-card__footer">
        <span>{post.likes.length} likes</span>
        {isAuthenticated && (
          <button className="button button--ghost" onClick={() => onLike(post._id)} type="button">
            Like / Unlike
          </button>
        )}
      </div>
    </article>
  );
};

export default PostCard;
