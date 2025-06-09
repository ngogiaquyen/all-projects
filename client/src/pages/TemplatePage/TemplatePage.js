import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TemplatePage.module.scss';
import Header from '~/components/templateWebsite/Header';
import Filter from '~/components/templateWebsite/Filter/Filter';
import MainContent from '~/components/templateWebsite/MainContent';
import FAQ from '~/components/templateWebsite/FAQ';
import Footer from '~/components/templateWebsite/Footer';
import AIChat from '../AIChat/AIChat';

const cx = classNames.bind(styles);

const TemplatePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'Tất cả', count: 7427 },
        { name: 'Nổi bật', count: 108 },
        { name: 'Miễn phí', count: 88 },
        // ... other categories
    ];

    const templates = [
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        { title: 'GSAP x GiveWell', creator: 'Maggy', image: 'https://ngogiaquyen.id.vn//uploads/684061636d29a_IMG_8796.jpeg', category: 'Portfolio & Đại lý', isFree: true },
        // ... other templates
    ];

    const faqs = [
        { question: 'Mẫu website là gì?', answer: 'Mẫu website là một trang web hoặc bộ trang web được thiết kế sẵn, có thể tùy chỉnh để tạo ra một website.' },
        // ... other FAQs
    ];

    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === 'Tất cả' || template.category === selectedCategory;
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             template.creator.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={cx('container')}>
            <Header />
            <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <MainContent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredTemplates={filteredTemplates}
            />
            <FAQ faqs={faqs} />
            <AIChat />
            <Footer />
        </div>
    );
};

export default TemplatePage;