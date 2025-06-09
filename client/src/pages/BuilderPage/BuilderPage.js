import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BuilderPage.module.scss';

const cx = classNames.bind(styles);

const componentsList = [
  {
    id: 'banner',
    name: 'Banner',
    content: (
      <div className="bg-blue-600 text-white p-6 text-center rounded-lg">
        <h1 className="text-3xl font-bold">Summer Sale - Up to 50% Off!</h1>
        <button className="mt-4 bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100">
          Shop Now
        </button>
      </div>
    ),
  },
  {
    id: 'product-card',
    name: 'Product Card',
    content: (
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <h3 className="text-lg font-semibold mt-2">Sample Product</h3>
        <p className="text-green-600 font-bold">250,000 VNĐ</p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    ),
  },
  {
    id: 'category-filter',
    name: 'Category Filter',
    content: (
      <div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
        <button className="px-4 py-2 bg-white rounded hover:bg-gray-200">All</button>
        <button className="px-4 py-2 bg-white rounded hover:bg-gray-200">Clothing</button>
        <button className="px-4 py-2 bg-white rounded hover:bg-gray-200">Shoes</button>
      </div>
    ),
  },
  {
    id: 'footer',
    name: 'Footer',
    content: (
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© 2025 Your Store. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-gray-300">Contact</a>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
      </footer>
    ),
  },
];

const BuilderPage = () => {
  const [pageComponents, setPageComponents] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('componentId', component.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isPreviewMode) return;
    const componentId = e.dataTransfer.getData('componentId');
    const selectedComponent = componentsList.find((comp) => comp.id === componentId);
    if (selectedComponent) {
      setPageComponents([...pageComponents, { ...selectedComponent, instanceId: Date.now() }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (instanceId) => {
    setPageComponents(pageComponents.filter((comp) => comp.instanceId !== instanceId));
  };

  const handleDragStartCanvas = (e, index) => {
    e.dataTransfer.setData('componentIndex', index);
  };

  const handleDropCanvas = (e, dropIndex) => {
    e.preventDefault();
    if (isPreviewMode) return;
    const dragIndex = e.dataTransfer.getData('componentIndex');
    const newComponents = [...pageComponents];
    const [draggedComponent] = newComponents.splice(dragIndex, 1);
    newComponents.splice(dropIndex, 0, draggedComponent);
    setPageComponents(newComponents);
  };

  return (
    <div className={cx('page-builder', 'flex h-screen')}>
      <aside className={cx('sidebar', 'w-1/4 bg-gray-100 p-4')}>
        <h2 className="text-2xl font-bold mb-4">Components</h2>
        {componentsList.map((component) => (
          <div
            key={component.id}
            draggable={!isPreviewMode}
            onDragStart={(e) => handleDragStart(e, component)}
            className={cx('component-item', 'p-3 mb-2 bg-white border rounded cursor-move shadow-sm', {
              'opacity-50': isPreviewMode,
            })}
          >
            {component.name}
          </div>
        ))}
        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className={cx(
            'preview-toggle',
            'mt-4 w-full py-2 px-4 rounded text-white',
            isPreviewMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          {isPreviewMode ? 'Exit Preview' : 'Preview Mode'}
        </button>
      </aside>
      <main
        className={cx('canvas', 'w-3/4 bg-gray-50 p-6')}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2 className="text-2xl font-bold mb-4">Page Canvas</h2>
        <div
          className={cx('canvas-content', 'min-h-[80vh] border-dashed border-2 border-gray-300 p-6', {
            'border-solid bg-white': isPreviewMode,
          })}
        >
          {pageComponents.length === 0 ? (
            <p className="text-gray-500 text-center">Drag components here to build your e-commerce page</p>
          ) : (
            pageComponents.map((comp, index) => (
              <div
                key={comp.instanceId}
                draggable={!isPreviewMode}
                onDragStart={(e) => handleDragStartCanvas(e, index)}
                onDrop={(e) => handleDropCanvas(e, index)}
                onDragOver={handleDragOver}
                className={cx('canvas-item', 'mb-4 p-2 rounded-lg', {
                  'bg-gray-100': !isPreviewMode,
                  'hover:bg-gray-200': !isPreviewMode,
                })}
              >
                <div className="relative">
                  {comp.content}
                  {!isPreviewMode && (
                    <button
                      onClick={() => handleDelete(comp.instanceId)}
                      className={cx(
                        'delete-button',
                        'absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'
                      )}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default BuilderPage;