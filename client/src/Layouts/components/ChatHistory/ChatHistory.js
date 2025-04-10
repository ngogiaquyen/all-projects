import React from 'react';
import styles from './ChatHistory.module.scss';

const ChatHistory = ({ messages }) => {
  return (
    <div className={styles['chat-history']}>
      {messages.map((message, index) => (
        <div key={index} className={message.user === 'You' ? styles['user-message'] : styles['ai-message']}>
          <p>
            {message.user}: {message.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
