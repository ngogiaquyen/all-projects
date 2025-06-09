import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import routes from '~/configs';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx('header')}>
            <div className={cx('header-top')}>
                <a href="#" className={cx('header-link')}>Bảng điều khiển</a>
                <a href="#" className={cx('header-link')}>Học tập</a>
                <NavLink to={routes.pageBuider} className={cx('header-button')}>Bắt đầu — miễn phí</NavLink>
            </div>
        </header>
    );
};

export default Header;