import classNames from 'classnames/bind';
import styles from './ThemeMode.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { ThemeModeContext } from '../Context/ThemeModeProvider';

const cx = classNames.bind(styles);

function ThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeModeContext);
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);
  return (
    <div className={cx('theme-wrap')}>
      <h3 className={cx('theme-title')}>Theme Mode</h3>
      <div className={cx('theme-toggle')} onClick={toggleTheme}>
        <FontAwesomeIcon className={cx('icon')} icon={isDarkMode ? faMoon : faSun} />
      </div>
    </div>
  );
}

export default ThemeMode;
