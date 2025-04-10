import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';
import {
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from 'react-icons/fa';
import { getData } from '~/helper/apiService';

const cx = classNames.bind(styles);

function ProductDetailPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API call
      // const response = await fetch(`/api/products/${productId}`);
      // const data = await response.json();

      // Mock data for demonstration
      const mockProduct = {
        id: 1,
        name: 'Tai nghe không dây Pro',
        description:
          'Tai nghe không dây cao cấp với công nghệ chống ồn và thời lượng pin dài. Sản phẩm được thiết kế với công nghệ tiên tiến, mang đến trải nghiệm âm thanh tuyệt vời cho người dùng. Tai nghe có khả năng chống ồn chủ động, giúp bạn tập trung vào âm thanh mà không bị ảnh hưởng bởi tiếng ồn xung quanh. Thời lượng pin dài lên đến 30 giờ, đủ cho cả ngày sử dụng. Kết nối Bluetooth 5.0 cho phép truyền tải âm thanh chất lượng cao và ổn định.',
        price: 49.99,
        originalPrice: 79.99,
        discount: 37,
        category: 1,
        categoryName: 'Điện tử',
        images: [
          'https://via.placeholder.com/600x600?text=Tai+nghe+1',
          'https://via.placeholder.com/600x600?text=Tai+nghe+2',
          'https://via.placeholder.com/600x600?text=Tai+nghe+3',
          'https://via.placeholder.com/600x600?text=Tai+nghe+4',
        ],
        stock: 100,
        rating: 4.8,
        reviews: 1250,
        sales: 12500,
        features: [
          'Chống ồn chủ động',
          'Thời lượng pin 30 giờ',
          'Kết nối Bluetooth 5.0',
          'Tương thích với nhiều thiết bị',
          'Điều khiển cảm ứng',
          'Chống nước và mồ hôi',
        ],
        specifications: {
          brand: 'TechPro',
          model: 'WH-1000XM4',
          color: 'Đen',
          size: 'One size',
          material: 'Nhựa cao cấp',
          weight: '250g',
          warranty: '12 tháng',
        },
        relatedProducts: [
          {
            id: 2,
            name: 'Đồng hồ thông minh Series 5',
            price: 129.99,
            originalPrice: 199.99,
            discount: 35,
            image: 'https://via.placeholder.com/200x200?text=Dong+ho',
            rating: 4.6,
            sales: 8900,
          },
          {
            id: 3,
            name: 'Pin sạc dự phòng 20000mAh',
            price: 29.99,
            originalPrice: 49.99,
            discount: 40,
            image: 'https://via.placeholder.com/200x200?text=Pin+sac',
            rating: 4.7,
            sales: 15600,
          },
          {
            id: 4,
            name: 'Loa Bluetooth',
            price: 39.99,
            originalPrice: 69.99,
            discount: 43,
            image: 'https://via.placeholder.com/200x200?text=Loa+Bluetooth',
            rating: 4.5,
            sales: 10200,
          },
        ],
      };

      setProduct(mockProduct);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setIsLoading(false);
      // Handle error (show notification, etc.)
    }
  };
  const fetchProduct2 = async () => {
    console.log(id);
    const res = await getData('/shop/detail?id=' + id);
    console.log(res);
  };
  useEffect(() => {
    fetchProduct();
    fetchProduct2();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleQuantityIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
    alert(`Đang chuyển đến trang thanh toán với ${quantity} sản phẩm "${product.name}"!`);
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Xem sản phẩm ${product.name} trên TikTok Shop`,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Chức năng chia sẻ không được hỗ trợ trên trình duyệt này.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('loading')}>Đang tải thông tin sản phẩm...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('error')}>
          <h2>Không tìm thấy sản phẩm</h2>
          <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button className={cx('back-btn')} onClick={handleBack}>
            <FaArrowLeft /> Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('wrapper')}>
      <button className={cx('back-btn')} onClick={handleBack}>
        <FaArrowLeft /> Quay lại
      </button>

      <div className={cx('product-container')}>
        <div className={cx('product-gallery')}>
          <div className={cx('main-image')}>
            <img src={product.images[currentImageIndex]} alt={product.name} />
            {product.images.length > 1 && (
              <>
                <button className={cx('nav-btn', 'prev')} onClick={handlePrevImage}>
                  <FaChevronLeft />
                </button>
                <button className={cx('nav-btn', 'next')} onClick={handleNextImage}>
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className={cx('thumbnails')}>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={cx('thumbnail', { active: index === currentImageIndex })}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={cx('product-info')}>
          <div className={cx('product-header')}>
            <h1 className={cx('product-name')}>{product.name}</h1>
            <div className={cx('product-meta')}>
              <div className={cx('rating')}>
                <FaStar className={cx('star-icon')} />
                <span>{product.rating}</span>
                <span className={cx('reviews')}>({product.reviews} đánh giá)</span>
              </div>
              <div className={cx('sales')}>
                <span>{product.sales.toLocaleString('vi-VN')} đã bán</span>
              </div>
            </div>
          </div>

          <div className={cx('product-price')}>
            <div className={cx('current-price')}>{product.price.toLocaleString('vi-VN')}đ</div>
            <div className={cx('original-price')}>{product.originalPrice.toLocaleString('vi-VN')}đ</div>
            <div className={cx('discount')}>-{product.discount}%</div>
          </div>

          <div className={cx('product-actions')}>
            <div className={cx('quantity-selector')}>
              <span>Số lượng:</span>
              <div className={cx('quantity-controls')}>
                <button className={cx('quantity-btn')} onClick={handleQuantityDecrement} disabled={quantity <= 1}>
                  -
                </button>
                <input type="number" value={quantity} onChange={handleQuantityChange} min="1" max={product.stock} />
                <button
                  className={cx('quantity-btn')}
                  onClick={handleQuantityIncrement}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className={cx('stock-info')}>{product.stock} sản phẩm có sẵn</span>
            </div>

            <div className={cx('action-buttons')}>
              <button className={cx('add-to-cart-btn')} onClick={handleAddToCart}>
                <FaShoppingCart /> Thêm vào giỏ hàng
              </button>
              <button className={cx('buy-now-btn')} onClick={handleBuyNow}>
                Mua ngay
              </button>
              <button className={cx('wishlist-btn')}>
                <FaHeart />
              </button>
              <button className={cx('share-btn')} onClick={handleShare}>
                <FaShare />
              </button>
            </div>
          </div>

          <div className={cx('product-features')}>
            <h3>Tính năng nổi bật</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={cx('shipping-info')}>
            <div className={cx('shipping-item')}>
              <FaTruck />
              <span>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
            </div>
            <div className={cx('shipping-item')}>
              <FaShieldAlt />
              <span>Bảo hành chính hãng {product.specifications.warranty}</span>
            </div>
            <div className={cx('shipping-item')}>
              <FaUndo />
              <span>Đổi trả trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('product-tabs')}>
        <div className={cx('tab-buttons')}>
          <button
            className={cx('tab-btn', { active: selectedTab === 'description' })}
            onClick={() => setSelectedTab('description')}
          >
            Mô tả sản phẩm
          </button>
          <button
            className={cx('tab-btn', { active: selectedTab === 'specifications' })}
            onClick={() => setSelectedTab('specifications')}
          >
            Thông số kỹ thuật
          </button>
          <button
            className={cx('tab-btn', { active: selectedTab === 'reviews' })}
            onClick={() => setSelectedTab('reviews')}
          >
            Đánh giá ({product.reviews})
          </button>
        </div>

        <div className={cx('tab-content')}>
          {selectedTab === 'description' && (
            <div className={cx('description-tab')}>
              <h2>Mô tả sản phẩm</h2>
              <div className={cx('description-content')}>
                {product.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'specifications' && (
            <div className={cx('specifications-tab')}>
              <h2>Thông số kỹ thuật</h2>
              <table className={cx('specifications-table')}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className={cx('reviews-tab')}>
              <h2>Đánh giá sản phẩm</h2>
              <div className={cx('reviews-summary')}>
                <div className={cx('average-rating')}>
                  <div className={cx('rating-number')}>{product.rating}</div>
                  <div className={cx('rating-stars')}>
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={cx('star-icon', {
                          filled: index < Math.floor(product.rating),
                          half: index === Math.floor(product.rating) && product.rating % 1 !== 0,
                        })}
                      />
                    ))}
                  </div>
                  <div className={cx('total-reviews')}>{product.reviews} đánh giá</div>
                </div>
              </div>
              <div className={cx('reviews-placeholder')}>
                <p>Chức năng đánh giá đang được phát triển. Vui lòng quay lại sau!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className={cx('related-products')}>
          <h2>Sản phẩm liên quan</h2>
          <div className={cx('related-products-grid')}>
            {product.relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className={cx('related-product-card')}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className={cx('related-product-image')}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>
                <div className={cx('related-product-info')}>
                  <h3>{relatedProduct.name}</h3>
                  <div className={cx('related-product-price')}>
                    <span className={cx('current-price')}>{relatedProduct.price.toLocaleString('vi-VN')}đ</span>
                    <span className={cx('original-price')}>
                      {relatedProduct.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span className={cx('discount')}>-{relatedProduct.discount}%</span>
                  </div>
                  <div className={cx('related-product-rating')}>
                    <FaStar className={cx('star-icon')} />
                    <span>{relatedProduct.rating}</span>
                    <span className={cx('sales')}>{relatedProduct.sales.toLocaleString('vi-VN')} đã bán</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
