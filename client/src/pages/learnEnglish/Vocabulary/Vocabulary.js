import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vocabulary.module.scss';
const cx = classNames.bind(styles);
const vocabularyData = [
  { word: 'Apple', meaning: 'Quả táo' },
  { word: 'Book', meaning: 'Quyển sách' },
  { word: 'Chair', meaning: 'Cái ghế' },
  { word: 'Run', meaning: 'Chạy' },
  { word: 'Happy', meaning: 'Hạnh phúc' },
];
const Vocabulary = () => {
  const [flipped, setFlipped] = useState(Array(vocabularyData.length).fill(false));
  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Học từ vựng</h1>
      <p className={cx('description')}> Ghi nhớ từ mới qua flashcards và chủ đề hàng ngày. </p>
      <div className={cx('cardGrid')}>
        {vocabularyData.map((item, index) => (
          <div key={index} className={cx('card')} onClick={() => handleFlip(index)}>
            {flipped[index] ? (
              <div className={cx('meaning')}>{item.meaning}</div>
            ) : (
              <div className={cx('word')}>{item.word}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Vocabulary;
