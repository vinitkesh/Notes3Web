import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

import '../Home/Home.css'

const MarkdownEditorPage = ({ title, content, onClose }) => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState(content || '');
  const [newTitle, setNewTitle] = useState(title || '');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/get-note/${noteId}`);
        if (response.data && response.data.note) {
          setNewTitle(response.data.note.title);
          setMarkdown(response.data.note.content);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          console.log('Unexpected error occurred while fetching note');
        }
      }
    };
    fetchNote();
  }, [noteId]);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/update-note/${noteId}`, {
        title: newTitle,
        content: markdown,
      });
      navigate('/notes');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.log('Unexpected error occurred while updating note');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <div className="md:w-1/2 p-4 border-r border-gray-300">
        <input
          type="text"
          className="w-full text-xl font-bold border-b border-gray-300 mb-4 p-2"
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="Note Title"
        />
        <textarea
          className="w-full h-full p-2 border border-gray-300 rounded-md"
          value={markdown}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="md:w-1/2 p-4 overflow-auto markdown-css">
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="markdown-css"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>

      <div className="p-4 flex flex-col justify-between mt-4 items-center ">
        <button
          className="btn-primary w-min h-min text-black hover:text-white"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
        <button
          className="btn-secondary w-min h-min p-4 rounded bg-red-400"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditorPage;
