import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FAQItem.module.scss';

const cx = classNames.bind(styles);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cx('faq-item')}>
            <button
                className={cx('faq-question')}
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <span className={cx('faq-toggle')}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className={cx('faq-answer')}>{answer}</p>}
        </div>
    );
};

export default FAQItem;