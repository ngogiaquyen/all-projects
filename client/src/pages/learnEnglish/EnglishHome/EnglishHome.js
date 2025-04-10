import React from 'react';
import classNames from 'classnames/bind';
import styles from './EnglishHome.module.scss';
import routes from '~/configs';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const EnglishHome = () => {
  const features = [
    {
      title: 'Học từ vựng',
      description: 'Ghi nhớ từ mới qua flashcards và chủ đề hàng ngày.',
      link: routes.vocabulary
    },
    {
      title: 'Luyện viết',
      description: 'Nghe các đoạn hội thoại, video có phụ đề để cải thiện kỹ năng.',
      link: routes.writing
    },
    {
      title: 'Luyện nghe',
      description: 'Nghe các đoạn hội thoại, video có phụ đề để cải thiện kỹ năng.',
      link: routes.listening
    },
    {
      title: 'Trò chuyện với AI',
      description: 'Thực hành nói tiếng Anh như trò chuyện với bạn bè.',
      link: routes.chatWithAI
    },
  ];

  return (
    <div className={cx('container')}>
      <h1 className={cx('heading')}>Chào mừng đến với EnglishBuddy</h1>
      <p className={cx('subHeading')}>Học tiếng Anh dễ dàng và thú vị mỗi ngày!</p>
      <div className={cx('features')}>
        {features.map((feature, index) => (
          <NavLink key={index} to={feature?.link} className={cx('featureBox')}>
            <h2 className={cx('featureTitle')}>{feature.title}</h2>
            <p className={cx('featureDesc')}>{feature.description}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default EnglishHome;
