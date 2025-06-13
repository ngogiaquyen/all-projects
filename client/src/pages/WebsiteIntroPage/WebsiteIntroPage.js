import React from 'react';
import classNames from 'classnames/bind';
import styles from './WebsiteIntroPage.module.scss';

const cx = classNames.bind(styles);

const WebsiteIntroPage = () => {
  return (
    <div className={cx('intro-page', 'min-h-screen')}>
      {/* Hero Section */}
      <section className={cx('hero', 'bg-blue-600 text-white py-20 text-center')}>
        <h1 className={cx('hero-title', 'text-4xl font-bold mb-4')}>
          Chào Mừng Đến Với Cửa Hàng Trực Tuyến Của Bạn
        </h1>
        <p className={cx('hero-subtitle', 'text-xl mb-6')}>
          Mua sắm dễ dàng, nhanh chóng với các sản phẩm thời trang chất lượng cao!
        </p>
        <a
          href="#shop"
          className={cx('hero-cta', 'bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-gray-100')}
        >
          Khám Phá Ngay
        </a>
      </section>

      {/* Features Section */}
      <section className={cx('features', 'py-16 bg-gray-50')}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={cx('section-title', 'text-3xl font-bold text-center mb-12')}>
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <div className={cx('features-grid', 'grid grid-cols-1 md:grid-cols-3 gap-8')}>
            <div className={cx('feature-item', 'bg-white p-6 rounded-lg shadow-md')}>
              <h3 className={cx('feature-title', 'text-xl font-semibold mb-2')}>
                Sản Phẩm Chất Lượng
              </h3>
              <p className={cx('feature-desc', 'text-gray-600')}>
                Tất cả sản phẩm đều được chọn lọc kỹ lưỡng, đảm bảo chất lượng cao nhất.
              </p>
            </div>
            <div className={cx('feature-item', 'bg-white p-6 rounded-lg shadow-md')}>
              <h3 className={cx('feature-title', 'text-xl font-semibold mb-2')}>
                Giao Hàng Nhanh Chóng
              </h3>
              <p className={cx('feature-desc', 'text-gray-600')}>
                Giao hàng toàn quốc trong 2-3 ngày với dịch vụ đáng tin cậy.
              </p>
            </div>
            <div className={cx('feature-item', 'bg-white p-6 rounded-lg shadow-md')}>
              <h3 className={cx('feature-title', 'text-xl font-semibold mb-2')}>
                Hỗ Trợ 24/7
              </h3>
              <p className={cx('feature-desc', 'text-gray-600')}>
                Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={cx('about', 'py-16')}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/600x400?text=Store+Image"
              alt="Store"
              className={cx('about-image', 'w-full rounded-lg shadow-md')}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className={cx('section-title', 'text-3xl font-bold mb-4')}>
              Về Cửa Hàng Của Chúng Tôi
            </h2>
            <p className={cx('about-desc', 'text-gray-600 mb-4')}>
              Chúng tôi là cửa hàng trực tuyến hàng đầu, chuyên cung cấp các sản phẩm thời trang
              hiện đại và chất lượng. Với sứ mệnh mang đến trải nghiệm mua sắm tuyệt vời, chúng tôi
              cam kết đem lại giá trị tốt nhất cho khách hàng.
            </p>
            <a
              href="#about"
              className={cx('about-cta', 'bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700')}
            >
              Tìm Hiểu Thêm
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={cx('cta', 'bg-blue-600 text-white py-16 text-center')}>
        <h2 className={cx('cta-title', 'text-3xl font-bold mb-4')}>
          Sẵn Sàng Mua Sắm?
        </h2>
        <p className={cx('cta-desc', 'text-lg mb-6')}>
          Tham gia ngay hôm nay để nhận ưu đãi đặc biệt và cập nhật xu hướng mới nhất!
        </p>
        <a
          href="#shop"
          className={cx('cta-button', 'bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-gray-100')}
        >
          Bắt Đầu Mua Sắm
        </a>
      </section>

      {/* Footer */}
      <footer className={cx('footer', 'bg-gray-800 text-white p-6 text-center')}>
        <p>© 2025 Your Store. All rights reserved.</p>
        <div className={cx('footer-links', 'flex justify-center gap-4 mt-2')}>
          <a href="#" className="hover:text-gray-300">Liên Hệ</a>
          <a href="#" className="hover:text-gray-300">Chính Sách Bảo Mật</a>
          <a href="#" className="hover:text-gray-300">Điều Khoản Dịch Vụ</a>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteIntroPage;