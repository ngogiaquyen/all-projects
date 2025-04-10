import React from 'react';
import classnames from 'classnames/bind';
import styles from './DevelopmentNotice.module.scss';

const cx = classnames.bind(styles);

const DevelopmentNotice = () => {
  return (
    <div className={cx('notice')}>
      🚧 Trang web hiện đang trong quá trình phát triển. Một số tính năng có thể chưa hoàn thiện. Cảm ơn bạn đã ghé thăm! 🚀
    </div>
  );
};

export default DevelopmentNotice;
