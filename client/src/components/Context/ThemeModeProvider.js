import { createContext, useEffect, useState } from 'react';

const ThemeModeContext = createContext();

function ThemeModeProvider({ children }) {
  // Hàm lấy theme ban đầu từ localStorage hoặc hệ thống
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Cập nhật theme vào localStorage và HTML mỗi khi theme thay đổi
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // useEffect(() => {
  //   setTheme(isDarkMode2 ? 'dark' : 'light');
  //   localStorage.setItem('theme', isDarkMode2 ? 'dark' : 'light');
  // }, [isDarkMode2]);

  // Hàm đổi theme khi nhấn nút
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return <ThemeModeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeModeContext.Provider>;
}

export { ThemeModeContext, ThemeModeProvider };
