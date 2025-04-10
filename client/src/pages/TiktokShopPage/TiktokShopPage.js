import classNames from 'classnames/bind';
import styles from './TiktokShopPage.module.scss';
import { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaHeart, FaStar, FaTiktok, FaArrowRight } from 'react-icons/fa';
import { BASE_URL_IMG, getData } from '~/helper/apiService';
import { NavLink } from 'react-router-dom';
import routes from '~/configs';

const cx = classNames.bind(styles);

// const featuredProducts = [
//   {
//     id: 1,
//     name: 'Tai nghe không dây Pro',
//     price: 49.99,
//     originalPrice: 79.99,
//     discount: 37,
//     image: 'https://via.placeholder.com/200x200?text=Tai+nghe',
//     rating: 4.8,
//     sales: 12500,
//   },
// ];

// const trendingProducts = [
//     {
//       id: 5,
//       name: 'Đèn LED dải',
//       price: 19.99,
//       originalPrice: 39.99,
//       discount: 50,
//       image: 'https://via.placeholder.com/200x200?text=Den+LED',
//       rating: 4.9,
//       sales: 23400,
//     },

//   ];

function TiktokShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  const loadFeaturedProducts = async () => {
    const res = await getData('/shop/read');
    console.log(res);
    if (res) {
      setFeaturedProducts(res);
      setTrendingProducts(res);
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Điện tử', icon: '🔌' },
    { id: 2, name: 'Thời trang', icon: '👕' },
    { id: 3, name: 'Nhà bếp', icon: '🏠' },
    { id: 4, name: 'Làm đẹp', icon: '💄' },
    { id: 5, name: 'Thể thao', icon: '⚽' },
    { id: 6, name: 'Đồ chơi', icon: '🎮' },
    { id: 7, name: 'Sách', icon: '📚' },
    { id: 8, name: 'Ô tô', icon: '🚗' },
  ];

  // Mock data for trending products

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Đang tìm kiếm:', searchQuery);
  };

  return (
    <div className={cx('wrapper')}>
      {/* Hero Section */}
      <section className={cx('hero')}>
        <div className={cx('hero-content')}>
          <h1>Khám phá sản phẩm tuyệt vời trên TikTok Shop</h1>
          <p>Tìm những ưu đãi tốt nhất và sản phẩm thịnh hành với giảm giá độc quyền</p>
          <form className={cx('search-form')} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className={cx('categories')}>
        <h2>Mua sắm theo danh mục</h2>
        <div className={cx('categories-grid')}>
          {categories.map((category) => (
            <div key={category.id} className={cx('category-card')}>
              <div className={cx('category-icon')}>{category.icon}</div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={cx('featured-products')}>
        <div className={cx('section-header')}>
          <h2>Sản phẩm nổi bật</h2>
          <a href="#" className={cx('view-all')}>
            Xem tất cả <FaArrowRight />
          </a>
        </div>
        <div className={cx('products-grid')}>
          {featuredProducts.map((product) => (
            <NavLink key={product.id} to={`${routes.productDetail}/${product.id}`} className={cx('product-card')}>
              <div className={cx('product-image')}>
                <img src={BASE_URL_IMG + product.image} alt={product.name} />
                <div className={cx('product-actions')}>
                  <button className={cx('action-btn')}>
                    <FaHeart />
                  </button>
                  <button className={cx('action-btn')}>
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
              <div className={cx('product-info')}>
                <h3>{product.name}</h3>
                <div className={cx('product-price')}>
                  <span className={cx('current-price')}>{product.price.toLocaleString('vi-VN')}đ</span>
                  <span className={cx('original-price')}>{product.original_price.toLocaleString('vi-VN')}đ</span>
                  <span className={cx('discount')}>-{product.discount}%</span>
                </div>
                <div className={cx('product-rating')}>
                  <FaStar className={cx('star-icon')} />
                  <span>{product.rating}</span>
                  <span className={cx('sales')}>{product.sales_count.toLocaleString('vi-VN')} đã bán</span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className={cx('trending-products')}>
        <div className={cx('section-header')}>
          <h2>Đang thịnh hành</h2>
          <a href="#" className={cx('view-all')}>
            Xem tất cả <FaArrowRight />
          </a>
        </div>
        <div className={cx('products-grid')}>
          {trendingProducts.map((product) => (
            <div key={product.id} className={cx('product-card')}>
              <div className={cx('product-image')}>
                <img src={product.image} alt={product.name} />
                <div className={cx('product-actions')}>
                  <button className={cx('action-btn')}>
                    <FaHeart />
                  </button>
                  <button className={cx('action-btn')}>
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
              <div className={cx('product-info')}>
                <h3>{product.name}</h3>
                <div className={cx('product-price')}>
                  <span className={cx('current-price')}>{product.price.toLocaleString('vi-VN')}đ</span>
                  <span className={cx('original-price')}>{product.original_price.toLocaleString('vi-VN')}đ</span>
                  <span className={cx('discount')}>-{product.discount}%</span>
                </div>
                <div className={cx('product-rating')}>
                  <FaStar className={cx('star-icon')} />
                  <span>{product.rating}</span>
                  <span className={cx('sales')}>{product.sales_count.toLocaleString('vi-VN')} đã bán</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className={cx('promo-banner')}>
        <div className={cx('promo-content')}>
          <h2>Ưu đãi đặc biệt</h2>
          <p>Giảm giá lên đến 50% cho các sản phẩm được chọn</p>
          <button className={cx('promo-btn')}>Mua ngay</button>
        </div>
      </section>

      {/* TikTok Shop Info */}
      <section className={cx('tiktok-info')}>
        <div className={cx('tiktok-logo')}>
          <FaTiktok />
        </div>
        <h2>Tại sao nên mua sắm trên TikTok Shop?</h2>
        <div className={cx('benefits-grid')}>
          <div className={cx('benefit-card')}>
            <h3>Ưu đãi độc quyền</h3>
            <p>Tiếp cận các ưu đãi và khuyến mãi đặc biệt không có ở nơi khác</p>
          </div>
          <div className={cx('benefit-card')}>
            <h3>Sản phẩm thịnh hành</h3>
            <p>Khám phá những sản phẩm viral mới nhất mà mọi người đang nói đến</p>
          </div>
          <div className={cx('benefit-card')}>
            <h3>Mua sắm an toàn</h3>
            <p>Giao dịch an toàn và được bảo vệ với chính sách bảo vệ người mua</p>
          </div>
          <div className={cx('benefit-card')}>
            <h3>Giao hàng nhanh chóng</h3>
            <p>Tùy chọn vận chuyển nhanh để nhận sản phẩm của bạn sớm hơn</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TiktokShopPage;
