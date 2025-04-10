import { Children, createContext, useState } from 'react';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (newToast) => {
    setToasts((prev) => {
      const updatedToasts = [...prev, newToast];

      // Nếu quá 3 toast thì xóa toast đầu tiên
      if (updatedToasts.length > 3) {
        updatedToasts.shift();
      }

      return updatedToasts;
    });

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast !== newToast));
    }, 3000);
  };
  return <ToastContext.Provider value={{ toasts, addToast }}>{children}</ToastContext.Provider>;
}

export { ToastContext, ToastProvider };
