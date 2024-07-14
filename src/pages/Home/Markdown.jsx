import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import TagList from '../../components/Cards/TagList';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Markdown = ({ noteData, type, getAllNotes, onClose, showToastMsg }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState('');

  const fetchNote = async (noteId) => {
    try {
      const response = await axiosInstance.get('/get-note/' + noteId);
      if (response.data && response.data.note) {
        setTitle(response.data.note.title);
        setContent(response.data.note.content);
        setTags(response.data.note.tags);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        return;
      } else console.log('Unexpected error occurred while fetching note');
    }
  };

  return (
    <div className="Markdown relative h-max w-full flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose size={24} className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-4 p-4 h-max">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-slate-950">
            {title || 'Could not load title'}
          </h1>
        </div>

        <div id='markdown-css' className="flex flex-col gap-2 mt-4 markdown-css border-yellow-600 border-[2px] rounded p-5 bg-zinc-800">
          <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={darcula}
                    language={match[1]}
                    PreTag="div"
                    className='markdown-css'
                    
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

        <div className="mt-3">
          <TagList className={'scale-50'} tags={tags} />
        </div>

        {/* <button
          className="btn-primary mt-5 font-medium p-3 w-64"
        >
          Open In Markdown Editor
        </button> */}
      </div>
    </div>
  );
};

export default Markdown;
