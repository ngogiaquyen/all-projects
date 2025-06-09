import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import * as XLSX from 'xlsx';
import styles from './ThanhUyPage.module.scss';

const cx = classNames.bind(styles);

const initialFormState = {
  soKyHieu: '',
  ngayThang: { day: '', month: '', year: '' }, // Changed to object
  tenLoaiTrichYeu: '',
  tacGia: '',
  nguoiKy: '',
  doMat: '',
  loaiBan: '',
  trangSo: '',
  soTrang: '',
  tuKhoa: '',
  ghiChu: '',
  soLuongTep: '',
  tenTep: null,
};

const defaultSelectOptions = {
  soKyHieu: ['Khác'],
  ngayThang: ['Khác'],
  tenLoaiTrichYeu: ['Khác'],
  tacGia: ['Khác'],
  nguoiKy: ['Khác'],
  doMat: ['Mật', 'Tối mật', 'Tuyệt mật'],
  loaiBan: ['Khác'],
  trangSo: ['Khác'],
  soTrang: ['Khác'],
  tuKhoa: ['Khác'],
  ghiChu: ['Không mộc', 'Khác'],
  soLuongTep: ['0', '1', '2', 'Khác'],
};

// Utility functions for date formatting
const formatDateToDisplay = (date) => {
  if (!date || !date.day || !date.month || !date.year) return '';
  return `${date.day}/${date.month}/${date.year}`;
};

const formatDateToInput = (dateStr) => {
  if (!dateStr) return { day: '', month: '', year: '' };
  const [day, month, year] = dateStr.split('/');
  return { day, month, year };
};

const generateDateOptions = () => ({
  days: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
  months: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')),
  years: Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => String(new Date().getFullYear() - i)),
});

const fieldKeys = [
  'stt',
  'soKyHieu',
  'ngayThang',
  'tenLoaiTrichYeu',
  'tacGia',
  'nguoiKy',
  'doMat',
  'loaiBan',
  'trangSo',
  'soTrang',
  'tuKhoa',
  'ghiChu',
  'soLuongTep',
  'tenTep',
];

function ThanhUyPage() {
  const [form, setForm] = useState(initialFormState);
  const [documents, setDocuments] = useState([]);
  const [selectOptions, setSelectOptions] = useState(defaultSelectOptions);
  const [editingDoc, setEditingDoc] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoadLocalstorage, setIsLoadLocalstorage] = useState(0);
  const [showIndex, setShowIndex] = useState(0);
  const inputRefs = useRef([]);
  const [showModal, setShowModal] = useState(true);
  const [nextNumber, setNextNumber] = useState(1);

  const inputFields = [
    { name: 'stt', label: 'STT', type: 'text', disabled: true },
    { name: 'soKyHieu', label: 'Số, ký hiệu', type: 'number', withSelect: true },
    { name: 'ngayThang', label: 'Ngày tháng', type: 'date-select', withSelect: true }, // Updated type
    { name: 'tenLoaiTrichYeu', label: 'Tên loại và trích yếu', type: 'textarea', withSelect: true },
    { name: 'tacGia', label: 'Tác giả', type: 'text', withSelect: true },
    { name: 'nguoiKy', label: 'Người ký', type: 'text', withSelect: true },
    { name: 'doMat', label: 'Độ mật', type: 'text', withSelect: true },
    { name: 'loaiBan', label: 'Loại bản', type: 'text', withSelect: true },
    { name: 'trangSo', label: 'Trang số', type: 'number', withSelect: true },
    { name: 'soTrang', label: 'Số trang', type: 'number', withSelect: true },
    { name: 'tuKhoa', label: 'Từ khóa', type: 'textarea', withSelect: true, hidden: true },
    { name: 'ghiChu', label: 'Ghi chú', type: 'textarea', withSelect: true, hidden: true },
    { name: 'soLuongTep', label: 'Số lượng tệp', type: 'number', withSelect: true, hidden: true },
    { name: 'tenTep', label: 'Tên tệp tài liệu', type: 'file', hidden: true },
  ];

  const visibleInputs = inputFields.filter((field) => !field.hidden);

  useEffect(() => {
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      try {
        const parsedDocuments = JSON.parse(savedDocuments);
        if (Array.isArray(parsedDocuments)) {
          // Convert ngayThang string to object for existing documents
          // const convertedDocuments = parsedDocuments.map((doc) => ({
          //   ...doc,
          //   ngayThang:
          //     typeof doc.ngayThang === 'string' ? formatDateToInput(formatDateToDisplay(doc.ngayThang)) : doc.ngayThang,
          // }));
          setDocuments(parsedDocuments);
          setIsLoadLocalstorage((prev) => prev + 1);
        }
      } catch (e) {
        console.error('Error parsing documents from localStorage:', e);
      }
    }

    const savedOptions = localStorage.getItem('selectOptions');
    if (savedOptions) {
      try {
        const parsedOptions = JSON.parse(savedOptions);
        if (typeof parsedOptions === 'object' && parsedOptions !== null) {
          setSelectOptions(parsedOptions);
        } else {
          localStorage.setItem('selectOptions', JSON.stringify(defaultSelectOptions));
          setSelectOptions(defaultSelectOptions);
        }
        setIsLoadLocalstorage((prev) => prev + 1);
      } catch (e) {
        console.error('Error parsing selectOptions from localStorage:', e);
        localStorage.setItem('selectOptions', JSON.stringify(defaultSelectOptions));
        setSelectOptions(defaultSelectOptions);
      }
    } else {
      localStorage.setItem('selectOptions', JSON.stringify(defaultSelectOptions));
      setSelectOptions(defaultSelectOptions);
    }
  }, []);

  useEffect(() => {
    console.log('documents: ', documents);
    if (isLoadLocalstorage === 2) {
      // Convert ngayThang object to string for storage
      // const documentsToSave = documents.map((doc) => ({
      //   ...doc,
      //   ngayThang: formatDateToDisplay(doc.ngayThang),
      // }));
      localStorage.setItem('documents', JSON.stringify(documents));
    }
  }, [documents, isLoadLocalstorage]);

  useEffect(() => {
    if (documents.length > 0) {
      const lastDoc = documents[documents.length - 1];
      const trangSo = Number(lastDoc.trangSo) || 1;
      const soTrang = Number(lastDoc.soTrang) || 1;
      setNextNumber(trangSo + soTrang); // Update last page index
      const number = trangSo + soTrang;
      if (number < 10) {
        form['trangSo'] = `0${number}`;
      } else {
        form['trangSo'] = `${number}`;
      }
    }
  }, [documents]);

  useEffect(() => {
    if (isLoadLocalstorage === 2) {
      localStorage.setItem('selectOptions', JSON.stringify(selectOptions));
    }
  }, [selectOptions, isLoadLocalstorage]);

  useEffect(() => {
    if (inputRefs.current[showIndex]) {
      inputRefs.current[showIndex].focus();
    }
  }, [showIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // if (showModal && event.ctrlKey) {
      //   if (event.key === 'ArrowRight') {
      //     handleNext();
      //   } else if (event.key === 'ArrowLeft') {
      //     handlePrevious();
      //   }
      // }

      if (e.key === 'Enter') {
        console.log('hello');
        e.preventDefault();
        if (showModal) {
          console.log(showIndex)
          if (showIndex === visibleInputs.length - 1) {
            handleAddOrUpdateDocument(e);
          } else {
            handleNext();
          }
        } else {
          setShowModal(true);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal, showIndex]);

  const nextSTT = documents.length > 0 ? Number(documents[documents.length - 1].stt) + 1 : 1;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'ngayThangDay' || name === 'ngayThangMonth' || name === 'ngayThangYear') {
      const field = name.replace('ngayThang', '').toLowerCase();
      setForm((prior) => ({
        ...prior,
        ngayThang: { ...prior.ngayThang, [field]: value },
      }));
    } else {
      setForm((prior) => ({
        ...prior,
        [name]: type === 'file' ? files : value,
      }));
    }
  };

  const handleAddOrUpdateDocument = (e) => {
    e.preventDefault();
    const { day, month, year } = form.ngayThang;
    const formattedDate = day && month && year ? `${day}/${month}/${year}` : '';
    console.log(formattedDate);

    const documentData = {
      ...form,
      ngayThang: formattedDate,
      tenTep: form.tenTep
        ? Array.from(form.tenTep)
            .map((f) => f.name)
            .join(', ')
        : '',
    };

    setSelectOptions((prior) => {
      const updatedOptions = { ...prior };
      Object.keys(form).forEach((key) => {
        if (
          key === 'ngayThang' &&
          formattedDate &&
          !updatedOptions[key].includes(formatDateToDisplay(form[key])) &&
          formatDateToDisplay(form[key]) !== 'Khác'
        ) {
          updatedOptions[key] = [
            ...updatedOptions[key].filter((opt) => opt !== 'Khác'),
            formatDateToDisplay(form[key]),
            'Khác',
          ];
        } else if (
          key !== 'stt' &&
          key !== 'tenTep' &&
          key !== 'ngayThang' &&
          form[key] &&
          !updatedOptions[key].includes(form[key]) &&
          form[key] !== 'Khác'
        ) {
          updatedOptions[key] = [...updatedOptions[key].filter((opt) => opt !== 'Khác'), form[key], 'Khác'];
        }
      });
      return updatedOptions;
    });

    if (editingDoc) {
      setDocuments((prior) =>
        prior.map((doc) => (doc.stt === editingDoc ? { ...doc, ...documentData, stt: doc.stt } : doc)),
      );
      setEditingDoc(null);
      setForm(initialFormState);
    } else {
      const newDocument = {
        stt: String(nextSTT),
        ...documentData,
      };
      console.log(newDocument);
      setDocuments((prior) => [...prior, newDocument]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowIndex(0);
    setShowModal(false);
  };

  const handleEditDocument = (doc) => {
    setShowModal(true);
    setForm({
      ...doc,
      ngayThang:
        typeof doc.ngayThang === 'string' ? formatDateToInput(formatDateToDisplay(doc.ngayThang)) : doc.ngayThang,
      tenTep: null,
    });
    setEditingDoc(doc.stt);
    setShowIndex(0);
  };

  const handleDeleteDocument = (stt) => {
    setDocuments((prior) => prior.filter((doc) => doc.stt !== stt));
    if (editingDoc === stt) {
      setEditingDoc(null);
      setForm(initialFormState);
      setShowIndex(0);
    }
    autoUpdateStt();
  };

  const handleClearDocuments = () => {
    setDocuments([]);
    localStorage.removeItem('documents');
    setEditingDoc(null);
    setForm(initialFormState);
    setShowIndex(0);
  };

  const handleExportExcel = () => {
    if (documents.length === 0) {
      alert('Không có tài liệu để xuất!');
      return;
    }

    const worksheetData = documents.map((doc) => ({
      STT: doc.stt,
      'Số, ký hiệu': doc.soKyHieu,
      'Ngày tháng': doc.ngayThang,
      'Trích yếu': doc.tenLoaiTrichYeu,
      'Tác giả': doc.tacGia,
      'Người ký': doc.nguoiKy,
      'Độ mật': doc.doMat,
      'Loại bản': doc.loaiBan,
      'Trang số': doc.trangSo,
      'Số trang': doc.soTrang,
      'Từ khóa': doc.tuKhoa,
      'Ghi chú': doc.ghiChu,
      'Số tệp': doc.soLuongTep,
      'Tên tệp': doc.tenTep,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Documents');
    XLSX.writeFile(workbook, 'documents.xlsx');
  };

  const handleKeyDown = (e) => {
    //
  };

  const handlePrevious = () => {
    setShowIndex((prior) => (prior > 0 ? prior - 1 : prior));
  };

  const handleNext = () => {
    setShowIndex((prior) => (prior < visibleInputs.length - 1 ? prior + 1 : prior));
  };

  const renderInput = (show, label, name, type = 'text', extraProps = {}) => (
    <label className={cx('formGroup', { show, hidden: ['tuKhoa', 'ghiChu', 'soLuongTep', 'tenTep'].includes(name) })}>
      {label}
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cx('input')}
        ref={(el) => {
          const index = visibleInputs.findIndex((field) => field.name === name);
          if (index !== -1) inputRefs.current[index] = el;
        }}
        {...extraProps}
      />
    </label>
  );

  const renderInputWithSelect = (show, label, name, options, type = 'text') => {
    if (name === 'ngayThang') {
      const { days, months, years } = generateDateOptions();
      return (
        <label className={cx('formGroup', { show })}>
          {label}: {`${form.ngayThang.day}/${form.ngayThang.month}/${form.ngayThang.year}`}
          <div className={cx('dateSelectGroup')}>
            <select
              name="ngayThangDay"
              value={form.ngayThang.day}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={cx('select', 'dateSelect')}
              ref={(el) => {
                const index = visibleInputs.findIndex((field) => field.name === name);
                if (index !== -1) inputRefs.current[index] = el;
              }}
            >
              <option value="">Ngày</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              name="ngayThangMonth"
              value={form.ngayThang.month}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={cx('select', 'dateSelect')}
            >
              <option value="">Tháng</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="ngayThangYear"
              value={form.ngayThang.year}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={cx('select', 'dateSelect')}
            >
              <option value="">Năm</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={formatDateToDisplay(form.ngayThang)}
              onChange={(e) => {
                const dateObj = formatDateToInput(e.target.value);
                setForm((prior) => ({
                  ...prior,
                  ngayThang: dateObj,
                }));
              }}
              className={cx('select')}
            >
              <option value="">-- Chọn --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    return (
      <label className={cx('formGroup', { show, hidden: ['tuKhoa', 'ghiChu', 'soLuongTep'].includes(name) })}>
        {label}: {form[name]}
        <div className={cx('inputWithSelect')}>
          {type === 'textarea' ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={cx('input')}
              placeholder="Nhập hoặc chọn..."
              ref={(el) => {
                const index = visibleInputs.findIndex((field) => field.name === name);
                if (index !== -1) inputRefs.current[index] = el;
              }}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={cx('input')}
              placeholder="Nhập hoặc chọn..."
              ref={(el) => {
                const index = visibleInputs.findIndex((field) => field.name === name);
                if (index !== -1) inputRefs.current[index] = el;
              }}
            />
          )}
          <select
            value={form[name]}
            onChange={(e) => setForm((prior) => ({ ...prior, [name]: e.target.value }))}
            className={cx('select')}
          >
            <option key={-1} value="">
              -- Chọn --
            </option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  };
  const autoUpdateStt = () => {
    setDocuments((prev) => {
      const newDoc = prev.map((doc, index) => {
        return { ...doc, stt: Number(index + 1) }; // ✅ Gán stt mới
      });
      return newDoc;
    });
  };

  // select number

  const handleClickValue = (num) => {
    updateFieldByIndex(showIndex, num);
  };

  const updateFieldByIndex = (index, newValue) => {
    const key = fieldKeys[index];
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] || '') + newValue, // nối thêm giá trị mới
    }));
  };

  const handleClearValue = () => {
    const key = fieldKeys[showIndex];
    setForm((prev) => ({
      ...prev,
      [key]: '',
    }));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left', { show: showModal })}>
        <div className={cx('overlay')} onClick={() => setShowModal(false)}></div>
        <div className={cx('left-container')}>
          <h1 className={cx('title')}>Nhập thông tin tài liệu</h1>
          <form onSubmit={handleAddOrUpdateDocument} className={cx('form')} noValidate>
            {inputFields.map((field, index) =>
              field.withSelect
                ? renderInputWithSelect(
                    showIndex === index,
                    field.label,
                    field.name,
                    selectOptions[field.name],
                    field.type,
                  )
                : renderInput(
                    showIndex === index,
                    field.label,
                    field.name,
                    field.type,
                    field.disabled ? { disabled: true, value: editingDoc || nextSTT } : {},
                  ),
            )}
            <div className={cx('buttonGroup')}>
              <button type="button" className={cx('submitButton')} onClick={handlePrevious} disabled={showIndex === 0}>
                Trước
              </button>
              <button
                type="button"
                className={cx('submitButton')}
                onClick={handleNext}
                disabled={showIndex === visibleInputs.length - 1}
              >
                Tiếp
              </button>
              <button type="submit" className={cx('submitButton')}>
                {editingDoc ? 'Lưu' : 'Thêm'}
              </button>
              {editingDoc && (
                <button
                  type="button"
                  className={cx('cancelButton')}
                  onClick={() => {
                    setEditingDoc(null);
                    setForm(initialFormState);
                    setShowIndex(0);
                    setShowModal(false);
                  }}
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
          <div className={cx('number-input-container')}>
            <div className={cx('number-button-grid')}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button key={num} onClick={() => handleClickValue(num)} className={cx('number-button')}>
                  {num}
                </button>
              ))}
              <button onClick={handleClearValue} className={cx('clear-button')}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('right')}>
        <h2 className={cx('title')}>Danh sách tài liệu đã nhập</h2>
        <div className={cx('buttonGroup')}>
          <button type="button" className={cx('exportButton')} onClick={() => setShowModal(true)}>
            Thêm
          </button>
        </div>
        <table className={cx('table')}>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Số, ký hiệu</th>
              <th scope="col">Ngày tháng</th>
              <th scope="col">Trích yếu</th>
              <th scope="col">Tác giả</th>
              <th scope="col">Người ký</th>
              <th scope="col">Độ mật</th>
              <th scope="col">Loại bản</th>
              <th scope="col">Trang số</th>
              <th scope="col">Số trang</th>
              <th scope="col">Từ khóa</th>
              <th scope="col">Ghi chú</th>
              <th scope="col">Số tệp</th>
              <th scope="col">Tên tệp</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={doc.stt || idx}>
                <td>{doc.stt}</td>
                <td>{doc.soKyHieu}</td>
                <td>{doc.ngayThang}</td>
                <td>{doc.tenLoaiTrichYeu}</td>
                <td>{doc.tacGia}</td>
                <td>{doc.nguoiKy}</td>
                <td>{doc.doMat}</td>
                <td>{doc.loaiBan}</td>
                <td>{doc.trangSo}</td>
                <td>{doc.soTrang}</td>
                <td>{doc.tuKhoa}</td>
                <td>{doc.ghiChu}</td>
                <td>{doc.soLuongTep}</td>
                <td>{doc.tenTep}</td>
                <td>
                  <button className={cx('editButton')} onClick={() => handleEditDocument(doc)}>
                    Sửa
                  </button>
                  <button className={cx('deleteButton')} onClick={() => handleDeleteDocument(doc.stt)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={cx('buttonGroup')}>
          <button type="button" className={cx('clearButton')} onClick={handleClearDocuments}>
            Xóa danh sách
          </button>
          <button type="button" className={cx('exportButton2')} onClick={handleExportExcel}>
            Tải xuống Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThanhUyPage;
