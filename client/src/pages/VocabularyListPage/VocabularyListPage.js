import React, { useEffect, useState } from 'react';
import styles from './VocabularyListPage.module.scss';
import classNames from 'classnames/bind';
import { getData, postData } from '~/helper/apiService';

const cx = classNames.bind(styles);

const sampleVocabularyItems1 = [
  {
    id: 1,
    word: 'Hello',
    meaning_vi: 'Xin chào',
    example_en: 'Hello, how are you?',
    example_vi: 'Xin chào, bạn khỏe không?',
  },
  {
    id: 2,
    word: 'Thank you',
    meaning_vi: 'Cảm ơn',
    example_en: 'Thank you for your help.',
    example_vi: 'Cảm ơn bạn đã giúp đỡ.',
  },
  {
    id: 3,
    word: 'Good morning',
    meaning_vi: 'Chào buổi sáng',
    example_en: 'Good morning, did you sleep well?',
    example_vi: 'Chào buổi sáng, bạn ngủ có ngon không?',
  },
  {
    id: 4,
    word: 'Please',
    meaning_vi: 'Làm ơn',
    example_en: 'Please help me with this.',
    example_vi: 'Làm ơn giúp tôi với việc này.',
  },
  {
    id: 5,
    word: 'Sorry',
    meaning_vi: 'Xin lỗi',
    example_en: "I'm sorry for being late.",
    example_vi: 'Tôi xin lỗi vì đã đến muộn.',
  },
];

const VocabularyListPage = () => {
  const [vocabularyItems, setVocabularyItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formValues, setFormValues] = useState({
    word: '',
    meaning_vi: '',
    example_en: '',
    example_vi: '',
  });
  const handleLoadData = async () => {
    const data = await getData('/english/read');
    console.log(data);
    if (data) {
      setVocabularyItems(data);
    }
  };
  useEffect(() => {
    handleLoadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    const formData2 = new FormData();
    formData2.append('word', formValues.word);
    formData2.append('meaning_vi', formValues.meaning_vi);
    formData2.append('example_en', formValues.example_en);
    formData2.append('example_vi', formValues.example_vi);
    const resonse = await postData('/english/create', formData2);
    if (resonse && resonse.status === 'success') {
      handleLoadData();
      setFormValues({
        word: '',
        meaning_vi: '',
        example_en: '',
        example_vi: '',
      });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormValues({
      word: item.word,
      meaning_vi: item.meaning_vi,
      example_en: item.example_en,
      example_vi: item.example_vi,
    });
  };

  const handleUpdate = async () => {
    const formData2 = new FormData();
    formData2.append('word', formValues.word);
    formData2.append('meaning_vi', formValues.meaning_vi);
    formData2.append('example_en', formValues.example_en);
    formData2.append('example_vi', formValues.example_vi);
    formData2.append('id', editingItem.id);

    const response = await postData('/english/update', formData2);
    if (response.status === 'success') {
      handleLoadData();
      setEditingItem(null);
      setFormValues({
        word: '',
        meaning_vi: '',
        example_en: '',
        example_vi: '',
      });
    }
  };

  const handleDelete = async (id) => {
    const formData2 = new FormData();
    formData2.append('id', id);
    console.log(id);
    const response = await postData('/english/delete', formData2);
    if (response.status === 'success') {
      handleLoadData();
    }
  };

  return (
    <div className={cx('vocabulary-list-container')}>
      <div className={cx('form-container')}>
        <h2>{editingItem ? 'Sửa từ vựng' : 'Thêm từ vựng mới'}</h2>
        <div className={cx('form-group')}>
          <input
            type="text"
            name="word"
            value={formValues.word}
            onChange={handleInputChange}
            placeholder="Từ tiếng Anh"
          />
          <input
            type="text"
            name="meaning_vi"
            value={formValues.meaning_vi}
            onChange={handleInputChange}
            placeholder="Nghĩa tiếng Việt"
          />
          <input
            type="text"
            name="example_en"
            value={formValues.example_en}
            onChange={handleInputChange}
            placeholder="Ví dụ tiếng Anh"
          />
          <input
            type="text"
            name="example_vi"
            value={formValues.example_vi}
            onChange={handleInputChange}
            placeholder="Ví dụ tiếng Việt"
          />
          <button onClick={editingItem ? handleUpdate : handleAdd} className={cx('submit-button')}>
            {editingItem ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </div>

      <table className={cx('vocabulary-table')}>
        <thead>
          <tr>
            <th>W</th>
            <th>Từ vựng</th>
            <th>Nghĩa tiếng Việt</th>
            <th>Ví dụ tiếng Anh</th>
            <th>Ví dụ tiếng Việt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {vocabularyItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.word}</td>
              <td>{item.meaning_vi}</td>
              <td>{item.example_en}</td>
              <td>{item.example_vi}</td>
              <td>
                <button onClick={() => handleEdit(item)} className={cx('edit-button')}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(item.id)} className={cx('delete-button')}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VocabularyListPage;
