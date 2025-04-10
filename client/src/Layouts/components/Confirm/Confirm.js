import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Confirm.module.scss';
import BeNgoan from '../BeNgoanCard';
import { useNavigate } from 'react-router-dom';
import routes from '~/configs';

const cx = classNames.bind(styles);

const Confirm = () => {
  const [code, setCode] = useState('');
  const nav = useNavigate();

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Mã nhập:', code);
    if (code) {
      nav(routes.beNgoan);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Nhập mã số</h2>

      <form onSubmit={handleSubmit} className={cx('form')}>
        <div className={cx('input-container')}>
          <input
            type="text"
            id="code"
            className={cx('input')}
            value={code}
            onChange={handleInputChange}
            placeholder="Nhập mã tại đây"
            required
          />
        </div>

        <button type="submit" className={cx('submit-button')}>
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default Confirm;
