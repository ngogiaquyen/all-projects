import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BeNgoanCard.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const BeNgoanCard = ({ tenBe="Hong Anh", tuoi=20, ngay, noiDung, range, avatarUrl = images.avta }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < noiDung.length) {
        // Cập nhật để xử lý ký tự xuống dòng thành <br />
        const contentWithBreaks = noiDung.slice(0, i + 1).replace(/\n/g, '<br />');
        setDisplayedContent(contentWithBreaks);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50); // 50ms cho mỗi ký tự
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [noiDung]);

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>🎖️ Phiếu Bé Ngoan 🎖️</h2>

      <div className={cx('avatar-container')}>
        <img className={cx('avatar')} src={avatarUrl} alt="Avatar" />
      </div>

      <div className={cx('info')}>
        <p className={cx('child-name')}>👦 Bé: {tenBe}</p>
        <p className={cx('child-age')}>🎂 Tuổi: {tuoi}</p>
      </div>

      <p className={cx('date')}>📅 Ngày: {ngay}</p>

      <div className={cx('content-box')}>
        <p className={cx('content')} dangerouslySetInnerHTML={{ __html: displayedContent }}></p>
      </div>

      <div className={cx('sticker')}>{range}</div>
    </div>
  );
};

export default BeNgoanCard;
