import React from 'react';
import classNames from 'classnames/bind';
import styles from './TemplateCard.module.scss';

const cx = classNames.bind(styles);

const TemplateCard = ({ title, creator, image, isFree }) => {
    return (
        <div className={cx('card')}>
            <img src={image} alt={title} className={cx('card-image')} />
            <div className={cx('card-content')}>
                <h3 className={cx('card-title')}>{title}</h3>
                <p className={cx('card-creator')}>{creator}</p>
                {isFree && <span className={cx('card-badge')}>Miễn phí</span>}
            </div>
        </div>
    );
};

export default TemplateCard;