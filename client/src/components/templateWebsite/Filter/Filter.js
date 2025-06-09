import React from 'react';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

const Filter = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className={cx('filter')}>
            <div className={cx('filter-content')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm mẫu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cx('search-input')}
                />
            </div>
        </div>
    );
};

export default Filter;