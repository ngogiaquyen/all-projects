import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TestPage.module.scss';
import { BASE_URL_IMG, getData } from '~/helper/apiService';
import mammoth from 'mammoth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import ThemeMode from '~/components/ThemeMode';

const cx = classNames.bind(styles);

function TestPage() {
  const [docList, setDocList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Trạng thái sidebar
  useEffect(() => {
    const loadData = async () => {
      const res = await getData('/docx/read');
      if (res.status === 'success') setDocList(res.data);
    };
    loadData();
  }, []);

  const parseQuestions = (text) => {
    const parts = text.split(/Question \d+/).filter(Boolean);
    return parts
      .map((part) => {
        const lines = part
          .split('\n')
          .map((line) => line.trim()) // Xóa khoảng trắng ở đầu và cuối mỗi dòng
          .filter((line) => line !== ''); // Bỏ các dòng trống

        if (lines.length < 2) return null; // Bỏ qua các câu hỏi không hợp lệ

        const questionText = lines[0]; // Câu hỏi chính
        const options = lines.slice(1); // Các đáp án
        const correctAnswers = options.filter((opt) => opt.startsWith('*')).map((opt) => opt.slice(1).trim());

        return {
          questionText,
          options: options.map((opt) => opt.replace('*', '').trim()),
          correctAnswers,
        };
      })
      .filter(Boolean); // Loại bỏ các phần tử null trong mảng
  };

  const handleDocClick = async (doc) => {
    const docUrl = BASE_URL_IMG + doc;
    try {
      const response = await fetch(docUrl);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setQuestions(parseQuestions(result.value));
      setCurrentIndex(0);
      setChecked(false);
      setSelectedAnswers({});
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev };
      if (updatedAnswers[currentIndex]?.includes(option)) {
        updatedAnswers[currentIndex] = updatedAnswers[currentIndex].filter((ans) => ans !== option);
      } else {
        updatedAnswers[currentIndex] = [...(updatedAnswers[currentIndex] || []), option];
      }
      return updatedAnswers;
    });
  };

  const checkAnswers = () => {
    setChecked(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setChecked(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setChecked(false);
    }
  };


  return (
    <div className={cx('wrapper')}>
      {/* Sidebar button */}
      <button className={cx('toggle-btn')} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      {sidebarOpen && <div className={cx('overlay')} onClick={() => setSidebarOpen(false)}></div>}
      {/* Sidebar */}
      <div className={cx('sidebar', { open: sidebarOpen })}>
        <ThemeMode/>
        <h2 className={cx('sidebar-title')}>Danh sách Tài liệu</h2>
        <ul className={cx('sidebar-list')}>
          {docList.map((doc, index) => (
            <li key={index} className={cx('sidebar-item')} onClick={() => handleDocClick(doc)}>
              {doc.replaceAll('test/', '')}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className={cx('content')}>
        {questions.length > 0 ? (
          <div className={cx('question')}>
            <h2 className={cx('question-title')}>
              Câu {currentIndex + 1}: {questions[currentIndex].questionText}
            </h2>
            <ul className={cx('options-list')}>
              {questions[currentIndex].options.map((option, idx) => (
                <li
                  key={idx}
                  className={cx('option-item', {
                    correct: checked && questions[currentIndex].correctAnswers.includes(option),
                    wrong:
                      checked &&
                      !questions[currentIndex].correctAnswers.includes(option) &&
                      selectedAnswers[currentIndex]?.includes(option),
                  })}
                  onClick={() => handleOptionClick(option)}
                >
                  <input type="checkbox" checked={selectedAnswers[currentIndex]?.includes(option) || false} readOnly />
                  {option}
                </li>
              ))}
            </ul>
            <div className={cx('buttons')}>
              <button className={cx('prev-btn')} onClick={prevQuestion} disabled={currentIndex === 0}>
                Câu trước
              </button>
              <button
                className={cx('next-btn')}
                onClick={nextQuestion}
                disabled={currentIndex === questions.length - 1}
              >
                Câu tiếp
              </button>
              <button className={cx('check-btn')} onClick={checkAnswers}>
                Kiểm tra
              </button>
            </div>
          </div>
        ) : (
          <p className={cx('select-doc-msg')}>Chọn tài liệu để xem chi tiết.</p>
        )}
      </div>
    </div>
  );
}

export default TestPage;
