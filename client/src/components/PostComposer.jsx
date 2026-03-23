import { useState } from 'react';

const PostComposer = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    setSubmitting(true);
    await onSubmit(content);
    setContent('');
    setSubmitting(false);
  };

  return (
    <form className="card composer" onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <textarea
        maxLength="280"
        placeholder="What's happening?"
        rows="4"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <div className="composer__footer">
        <span>{content.length}/280</span>
        <button className="button" disabled={submitting} type="submit">
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default PostComposer;
