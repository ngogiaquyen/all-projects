import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className={cx('sidebar')}>
            <h2 className={cx('sidebar-title')}>Danh mục</h2>
            <ul className={cx('category-list')}>
                {categories.map(category => (
                    <li
                        key={category.name}
                        className={cx('category-item', { 'category-item-active': selectedCategory === category.name })}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        {category.name} <span className={cx('category-count')}>({category.count})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;