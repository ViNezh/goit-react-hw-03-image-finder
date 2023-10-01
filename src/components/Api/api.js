import Axios from 'axios';
// Створюємо константи для запитів
const API_KEY = '38856418-a7b3dde49805ba60b9b57505c';
const URL = 'https://pixabay.com/api/?';
const PHOTOS_PER_PAGE = '12';

export const fetchImages = async (querry, currentPage = 1) => {
  // Створюємо об'єкт параметрів для запитів
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: querry,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: PHOTOS_PER_PAGE,
  });

  // Функція запиту на back end за допомогою бібліотеки axios
  const responce = await Axios.get(`${URL}${searchParams}`)
  return responce.data;
};
