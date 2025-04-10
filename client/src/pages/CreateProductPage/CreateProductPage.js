import { useState } from 'react';
import classNames from "classnames/bind";
import styles from './CreateProductPage.module.scss';
import { FaUpload, FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CreateProductPage() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        images: [],
        stock: '',
        features: [''],
        specifications: {
            brand: '',
            model: '',
            color: '',
            size: '',
            material: '',
            weight: '',
            warranty: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const categories = [
        { id: 1, name: "Điện tử" },
        { id: 2, name: "Thời trang" },
        { id: 3, name: "Nhà bếp" },
        { id: 4, name: "Làm đẹp" },
        { id: 5, name: "Thể thao" },
        { id: 6, name: "Đồ chơi" },
        { id: 7, name: "Sách" },
        { id: 8, name: "Ô tô" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSpecificationChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            specifications: {
                ...product.specifications,
                [name]: value
            }
        });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...product.features];
        newFeatures[index] = value;
        setProduct({
            ...product,
            features: newFeatures
        });
    };

    const addFeature = () => {
        setProduct({
            ...product,
            features: [...product.features, '']
        });
    };

    const removeFeature = (index) => {
        const newFeatures = [...product.features];
        newFeatures.splice(index, 1);
        setProduct({
            ...product,
            features: newFeatures
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate file types and sizes
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
            
            if (!isValidType) {
                setErrors({
                    ...errors,
                    images: 'Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc WebP'
                });
            }
            
            if (!isValidSize) {
                setErrors({
                    ...errors,
                    images: 'Kích thước file không được vượt quá 5MB'
                });
            }
            
            return isValidType && isValidSize;
        });
        
        if (validFiles.length === 0) return;
        
        // Create preview URLs
        const newPreviewImages = validFiles.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...newPreviewImages]);
        
        // Update product state with new images
        setProduct({
            ...product,
            images: [...product.images, ...validFiles]
        });
        
        // Clear error if images are valid
        if (errors.images) {
            setErrors({
                ...errors,
                images: ''
            });
        }
    };

    const removeImage = (index) => {
        const newImages = [...product.images];
        newImages.splice(index, 1);
        
        const newPreviewImages = [...previewImages];
        URL.revokeObjectURL(newPreviewImages[index]);
        newPreviewImages.splice(index, 1);
        
        setProduct({
            ...product,
            images: newImages
        });
        setPreviewImages(newPreviewImages);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!product.name.trim()) {
            newErrors.name = 'Vui lòng nhập tên sản phẩm';
        }
        
        if (!product.description.trim()) {
            newErrors.description = 'Vui lòng nhập mô tả sản phẩm';
        }
        
        if (!product.price) {
            newErrors.price = 'Vui lòng nhập giá sản phẩm';
        } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
            newErrors.price = 'Giá sản phẩm phải là số dương';
        }
        
        if (!product.originalPrice) {
            newErrors.originalPrice = 'Vui lòng nhập giá gốc sản phẩm';
        } else if (isNaN(product.originalPrice) || parseFloat(product.originalPrice) <= 0) {
            newErrors.originalPrice = 'Giá gốc sản phẩm phải là số dương';
        }
        
        if (parseFloat(product.price) > parseFloat(product.originalPrice)) {
            newErrors.price = 'Giá bán không thể cao hơn giá gốc';
        }
        
        if (!product.category) {
            newErrors.category = 'Vui lòng chọn danh mục sản phẩm';
        }
        
        if (product.images.length === 0) {
            newErrors.images = 'Vui lòng tải lên ít nhất một hình ảnh sản phẩm';
        }
        
        if (!product.stock) {
            newErrors.stock = 'Vui lòng nhập số lượng tồn kho';
        } else if (isNaN(product.stock) || parseInt(product.stock) < 0) {
            newErrors.stock = 'Số lượng tồn kho phải là số nguyên không âm';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            console.log('Product data:', product);
            // Here you would typically send the data to your backend
            alert('Sản phẩm đã được tạo thành công!');
            setIsSubmitting(false);
            navigate('/tiktok-shop'); // Redirect to product listing page
        }, 1500);
    };

    const handleCancel = () => {
        // Clean up preview URLs
        previewImages.forEach(url => URL.revokeObjectURL(url));
        navigate('/tiktok-shop');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <button className={cx('back-btn')} onClick={handleCancel}>
                    <FaArrowLeft /> Quay lại
                </button>
                <h1>Tạo sản phẩm mới</h1>
            </div>
            
            <form className={cx('product-form')} onSubmit={handleSubmit}>
                <div className={cx('form-section')}>
                    <h2>Thông tin cơ bản</h2>
                    
                    <div className={cx('form-group')}>
                        <label htmlFor="name">Tên sản phẩm <span className={cx('required')}>*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Nhập tên sản phẩm"
                            className={cx(errors.name ? 'error' : '')}
                        />
                        {errors.name && <p className={cx('error-message')}>{errors.name}</p>}
                    </div>
                    
                    <div className={cx('form-group')}>
                        <label htmlFor="description">Mô tả sản phẩm <span className={cx('required')}>*</span></label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Nhập mô tả chi tiết về sản phẩm"
                            rows="5"
                            className={cx(errors.description ? 'error' : '')}
                        ></textarea>
                        {errors.description && <p className={cx('error-message')}>{errors.description}</p>}
                    </div>
                    
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="price">Giá bán (đ) <span className={cx('required')}>*</span></label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className={cx(errors.price ? 'error' : '')}
                            />
                            {errors.price && <p className={cx('error-message')}>{errors.price}</p>}
                        </div>
                        
                        <div className={cx('form-group')}>
                            <label htmlFor="originalPrice">Giá gốc (đ) <span className={cx('required')}>*</span></label>
                            <input
                                type="number"
                                id="originalPrice"
                                name="originalPrice"
                                value={product.originalPrice}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className={cx(errors.originalPrice ? 'error' : '')}
                            />
                            {errors.originalPrice && <p className={cx('error-message')}>{errors.originalPrice}</p>}
                        </div>
                    </div>
                    
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="category">Danh mục <span className={cx('required')}>*</span></label>
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className={cx(errors.category ? 'error' : '')}
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className={cx('error-message')}>{errors.category}</p>}
                        </div>
                        
                        <div className={cx('form-group')}>
                            <label htmlFor="stock">Số lượng tồn kho <span className={cx('required')}>*</span></label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className={cx(errors.stock ? 'error' : '')}
                            />
                            {errors.stock && <p className={cx('error-message')}>{errors.stock}</p>}
                        </div>
                    </div>
                </div>
                
                <div className={cx('form-section')}>
                    <h2>Hình ảnh sản phẩm</h2>
                    
                    <div className={cx('form-group')}>
                        <label>Hình ảnh sản phẩm <span className={cx('required')}>*</span></label>
                        <div className={cx('image-upload')}>
                            <label htmlFor="images" className={cx('upload-btn')}>
                                <FaUpload /> Tải lên hình ảnh
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                onChange={handleImageUpload}
                                multiple
                                accept="image/jpeg,image/png,image/webp"
                                className={cx('file-input')}
                            />
                        </div>
                        <p className={cx('upload-hint')}>Hỗ trợ định dạng JPG, PNG, WebP. Tối đa 5MB mỗi ảnh.</p>
                        {errors.images && <p className={cx('error-message')}>{errors.images}</p>}
                    </div>
                    
                    {previewImages.length > 0 && (
                        <div className={cx('image-preview')}>
                            {previewImages.map((url, index) => (
                                <div key={index} className={cx('preview-item')}>
                                    <img src={url} alt={`Preview ${index + 1}`} />
                                    <button 
                                        type="button" 
                                        className={cx('remove-image')}
                                        onClick={() => removeImage(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className={cx('form-section')}>
                    <h2>Thông số kỹ thuật</h2>
                    
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="brand">Thương hiệu</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={product.specifications.brand}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập thương hiệu"
                            />
                        </div>
                        
                        <div className={cx('form-group')}>
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={product.specifications.model}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập model"
                            />
                        </div>
                    </div>
                    
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="color">Màu sắc</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={product.specifications.color}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập màu sắc"
                            />
                        </div>
                        
                        <div className={cx('form-group')}>
                            <label htmlFor="size">Kích thước</label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                value={product.specifications.size}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập kích thước"
                            />
                        </div>
                    </div>
                    
                    <div className={cx('form-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="material">Chất liệu</label>
                            <input
                                type="text"
                                id="material"
                                name="material"
                                value={product.specifications.material}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập chất liệu"
                            />
                        </div>
                        
                        <div className={cx('form-group')}>
                            <label htmlFor="weight">Trọng lượng</label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={product.specifications.weight}
                                onChange={handleSpecificationChange}
                                placeholder="Nhập trọng lượng"
                            />
                        </div>
                    </div>
                    
                    <div className={cx('form-group')}>
                        <label htmlFor="warranty">Bảo hành</label>
                        <input
                            type="text"
                            id="warranty"
                            name="warranty"
                            value={product.specifications.warranty}
                            onChange={handleSpecificationChange}
                            placeholder="Nhập thông tin bảo hành"
                        />
                    </div>
                </div>
                
                <div className={cx('form-section')}>
                    <h2>Tính năng nổi bật</h2>
                    
                    {product.features.map((feature, index) => (
                        <div key={index} className={cx('feature-item')}>
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder={`Tính năng ${index + 1}`}
                            />
                            {index > 0 && (
                                <button 
                                    type="button" 
                                    className={cx('remove-feature')}
                                    onClick={() => removeFeature(index)}
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                    
                    <button 
                        type="button" 
                        className={cx('add-feature-btn')}
                        onClick={addFeature}
                    >
                        + Thêm tính năng
                    </button>
                </div>
                
                <div className={cx('form-actions')}>
                    <button 
                        type="button" 
                        className={cx('cancel-btn')}
                        onClick={handleCancel}
                    >
                        Hủy
                    </button>
                    <button 
                        type="submit" 
                        className={cx('submit-btn')}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Tạo sản phẩm'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateProductPage;
