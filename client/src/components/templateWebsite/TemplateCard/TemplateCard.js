import React from 'react';
import classNames from 'classnames/bind';
import styles from './TemplateCard.module.scss';
import { NavLink } from 'react-router-dom';
import routes from '~/configs';

const cx = classNames.bind(styles);

const TemplateCard = ({ title, creator, image, isFree }) => {
    return (
        <NavLink to={routes.intro} className={cx('card')}>
            <img src={image} alt={title} className={cx('card-image')} />
            <div className={cx('card-content')}>
                <h3 className={cx('card-title')}>{title}</h3>
                <p className={cx('card-creator')}>{creator}</p>
                {isFree && <span className={cx('card-badge')}>Miễn phí</span>}
            </div>
        </NavLink>
    );
};

export default TemplateCard;