import React, { useState } from 'react';
import styles from './ChatBox.module.scss';

const ChatBox = ({ addMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      addMessage({ text: input, user: 'You' });
      setInput(''); // Reset input box
    }
  };

  return (
    <div className={styles['chat-box']}>
      <input
        type="text"
        placeholder="Nhập tin nhắn..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSend} className={styles.button}>
        Gửi
      </button>
    </div>
  );
};

export default ChatBox;
