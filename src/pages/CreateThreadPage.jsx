import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createThread} from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newThreadId = await dispatch(createThread({title, body, category}));

    if (newThreadId) {
      navigate(`/threads/${newThreadId}`);
    } else {
      alert('Gagal membuat thread.');
    }
  };

  return (
    <div className="create-thread-page">
      <h2>Buat Thread Baru</h2>
      <form onSubmit={handleSubmit} className="create-thread-form">
        <div>
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            id="title"
            placeholder="Judul thread"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Kategori</label>
          <input
            type="text"
            id="category"
            placeholder="Kategori (opsional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Isi Thread</label>
          <textarea
            id="body"
            placeholder="Tulis isi thread di sini..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            required
          />
        </div>
        <button type="submit">Buat Thread</button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
