import React, { useState } from 'react';
import styles from './ChatWithAIPage.module.scss';
import ChatHistory from '~/Layouts/components/ChatHistory';
import ChatBox from '~/Layouts/components/ChatBox';
import { getData } from '~/helper/apiService';

const ChatWithAIPage = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = async (message)  => {
    const formData = new FormData();
    formData.append("msg", message);
    console.log(message)
    const response = await getData(`/get-response/?msg="${message.text}"`);
    console.log(response.response)
    setMessages((prevMessages) => [...prevMessages, message, response?.response]);
  };

  return (
    <div className={styles['chat-page']}>
      <h1 className={styles.title}>Trò chuyện với AI</h1>
      <p className={styles.description}>Thực hành nói tiếng Anh như trò chuyện với bạn bè!</p>
      <ChatHistory messages={messages} />
      <ChatBox addMessage={addMessage} />
    </div>
  );
};

export default ChatWithAIPage;
