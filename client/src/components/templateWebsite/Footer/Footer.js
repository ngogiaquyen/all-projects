import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-section-title')}>Khám phá</h3>
                    <a href="#" className={cx('footer-link')}>Bảng điều khiển</a>
                    <a href="#" className={cx('footer-link')}>Thị trường</a>
                    <a href="#" className={cx('footer-link')}>Nhà thiết kế</a>
                </div>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-section-title')}>Học & Hỗ trợ</h3>
                    <a href="#" className={cx('footer-link')}>Hỗ trợ</a>
                    <a href="#" className={cx('footer-link')}>Đại học</a>
                    <a href="#" className={cx('footer-link')}>Khóa học</a>
                    <a href="#" className={cx('footer-link')}>Blog</a>
                </div>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-section-title')}>Công ty</h3>
                    <a href="#" className={cx('footer-link')}>Giới thiệu</a>
                    <a href="#" className={cx('footer-link')}>Tuyển dụng</a>
                    <a href="#" className={cx('footer-link')}>Sơ đồ trang</a>
                </div>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-section-title')}>Điều khoản & Chính sách</h3>
                    <a href="#" className={cx('footer-link')}>Điều khoản dịch vụ</a>
                    <a href="#" className={cx('footer-link')}>Chính sách bảo mật</a>
                    <a href="#" className={cx('footer-link')}>Chính sách cookie</a>
                </div>
                <p className={cx('footer-text')}>Tạo bởi Webflow</p>
            </div>
        </footer>
    );
};

export default Footer;