import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BeNgoanPage.module.scss';
import BeNgoanCard from '~/Layouts/components/BeNgoanCard/BeNgoanCard';
import BeNgoanCard2 from '~/Layouts/components/BeNgoanCard/BeNgoanCard2';
import images from '~/assets';
const cx = classNames.bind(styles);

function BeNgoanPage() {
  // Sample data for multiple cards
  const beNgoanData = [
    {
      id: 1,
      ngay: '04/04/2025',
      noiDung: 'Bé rất ngoan, lễ phép và chăm chỉ học tập!\nlâu lâu có bật chút nhưng không đáng kể',
      range: "🌟 Xuất sắc! 🌟",
      type: BeNgoanCard,
    },
    {
      id: 2,
      ngay: '08/04/2025',
      noiDung: 'Bé siêu ngoan, vâng lời và học hành rất chăm chỉ!\nĐôi lúc có \"quậy\" nhẹ cho vui lớp, nhưng nhìn chung rất dễ thương.',
      range: "💯 100 đỉm 💯",
      type: BeNgoanCard2,
      avatarUrl: images.avta2
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (be, type) => {
    console.log({be, type})
    setSelectedCard({be, type});
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  useEffect(()=>{
    handleCardClick(beNgoanData[beNgoanData.length - 1], beNgoanData[beNgoanData.length - 1].type)
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Danh Sách Bé Ngoan</h1>
      <div className={cx('grid')}>
        {beNgoanData.slice().reverse().map((be, index) => (
          <div key={be.id} className={cx('card-container')} onClick={() => handleCardClick(be, be.type)}>
            <be.type ngay={be.ngay} noiDung={be.noiDung} range={be.range} avatarUrl={be.avatarUrl} />
          </div>
        ))}
      </div>

      {selectedCard !== null && (
        <div className={cx('modal-overlay')} onClick={handleCloseModal}>
          <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
            <button className={cx('close-button')} onClick={handleCloseModal}>
              ×
            </button>
            <selectedCard.type  ngay={selectedCard.be.ngay} noiDung={selectedCard.be.noiDung} range={selectedCard.be.range}  avatarUrl={selectedCard.be.avatarUrl}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeNgoanPage;
