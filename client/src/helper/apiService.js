// apiService.js

// export const BASE_URL = 'http://localhost/my-profile/server';
export const BASE_URL = process.env.REACT_APP_BASE_API_URL;
export const BASE_URL_IMG = process.env.REACT_APP_BASE_IMG_URL;
export const BASE_URL_MUSIC = process.env.REACT_APP_BASE_MUSIC_URL;
// export const BASE_URL = 'https://ngogiaquyen.id.vn/server';
console.log(BASE_URL);

const getCsrfToken = () => {
  const csrfToken = document.cookie.match(/csrftoken=([^;]+)/);
  return csrfToken ? csrfToken[1] : '';
};


export const getData = async (endpoint, params = {}, startLoading = () => {}, stopLoading = () => {}) => {
  startLoading();
  // Tạo query string nếu có params
  const queryString = new URLSearchParams(params).toString();
  // const url = `${BASE_URL}${endpoint}`;
  const url = `${BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    stopLoading(); // Kết thúc loading
  }
};
export const postData = async (endpoint, payload, startLoading = () => {}, stopLoading = () => {}) => {
  startLoading();
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    stopLoading(); // Kết thúc loading
  }
};

export function downloadFile(endpoint, fileName = 'downloaded_file') {
  const url = `${BASE_URL}${endpoint}`;
  console.log(url)
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('File không tồn tại!');
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error('Lỗi tải file:', error));
}
