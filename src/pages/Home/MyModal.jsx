import React, { useEffect } from 'react';
import Modal from 'react-modal'; // Assuming you're using react-modal
import Markdown from './Markdown'; // Import the Markdown component
const MyModal = ({ openMarkdownModal, setOpenMarkdownModal, getAllNotes, showToastMessage }) => {
  useEffect(() => {
    if (openMarkdownModal.isShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMarkdownModal.isShown]);

  return (
    <Modal
      isOpen={openMarkdownModal.isShown}
      onRequestClose={() => setOpenMarkdownModal({ isShown: false, data: null })}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      }}
      contentLabel="Markdown Preview"
      className="modal-content"
    >
      <Markdown
        onClose={() => setOpenMarkdownModal({ isShown: false, data: null })}
        noteData={openMarkdownModal.data}
        getAllNotes={getAllNotes}
        showToastMsg={showToastMessage}
      />
    </Modal>
  );
};

export default MyModal;
