import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainContent.module.scss';
import Sidebar from '../Sidebar';
import TemplateCard from '../TemplateCard';

const cx = classNames.bind(styles);

const MainContent = ({ categories, selectedCategory, setSelectedCategory, filteredTemplates }) => {
    return (
        <main id="main-content" className={cx('main')}>
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div className={cx('grid')}>
                {filteredTemplates.map((template, index) => (
                    <TemplateCard
                        key={index}
                        title={template.title}
                        creator={template.creator}
                        image={template.image}
                        isFree={template.isFree}
                    />
                ))}
            </div>
        </main>
    );
};

export default MainContent;