import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/searchbar';
import { ImageGallery } from './ImageGallery/imagegallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/button';
import { fetchImages } from './Api/api';
import { Loader } from './Loader/loader';
import Modal from './Modal/modal';

class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    images: [],
    totalHits: 0,
    error: null,
    isLoading: false,
    isModal: false,
    largeImageURL: '',
  };
  // При оновленні state наповнюємо галерею картками
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;
    // При новому слові запиту, викликаємо функцію нового запиту
    if (prevQuery !== nextQuery) {
      this.fetchNewQuery(nextQuery);
    }
    // При зміні номеру сторінки завантажуємо додаткові картки
    if (prevPage !== nextPage) {
      this.fetchNextPage(prevQuery, nextPage);
    }
    // Після завантаження нових карток автоматично прокручуємо екран вниз
    const { images } = this.state;
    if (images.length > prevState.images.length) {
      this.scrolling();
    }
  }
  // Функція обробки форми з пошуковим запитом
  searchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  // Функція отримання інформації з backend при новому пошуковому запиті
  fetchNewQuery = async newQuery => {
    try {
      //Показуємо loader
      this.setState({ isLoading: true });
      // очищаємо вміст галереї
      this.resetPage();
      // Викликаємо функцію http запиту
      const data = await fetchImages(newQuery);
      // Якщо отримаємо порожній масив, просимо ввести валідний пошуковий запит
      if (data.hits.length === 0) {
        toast.error('Enter valid search query');
        return;
      }
      this.setState({
        images: [...data.hits],
        totalHits: data.totalHits,
      });
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(
        'Unfortunately something went wrong. Please reload the page.'
      );
      // Ховаємо loader після виконання http запиту
    } finally {
      this.setState({ isLoading: false });
    }
  };
  // Функція отримання інформації з backend при натисканні кнопки load more(зміна номеру сторінки)
  fetchNextPage = async (prevQuery, nextPage) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(prevQuery, nextPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  // Функція зміни номеру сторінки після натискання кнопки Load more
  addPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  // Скидання state при новому значенні пошукового запиту
  resetPage = () => {
    this.setState({ images: [], currentPage: 1 });
  };
  // Функція прокручування вмісту екрану до кнопки load more, якщо вона показана, або до кінця галереї
  scrolling = () => {
    const btnLoadMore = document.querySelector('#loadMore');
    if (btnLoadMore) {
      btnLoadMore.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    const lastImage = document.querySelector('#ImageGallery').lastElementChild;
    if (!btnLoadMore) {
      lastImage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  // Функція виклику модалного вікна
  handleImageClick = largeImageURL => {
    this.setState({ isModal: true, largeImageURL });
  };
  // Функція закриття модального вікна
  handleCloseModal = () => {
    this.setState({ isModal: false, largeImageURL: '' });
  };

  render() {
    const length = this.state.images.length;
    const total = this.state.totalHits;
    return (
      <>
        <Searchbar handleSubmit={this.searchSubmit} />
        <ImageGallery>
          {length > 0 &&
            this.state.images.map(image => (
              <ImageGalleryItem
                source={image.webformatURL}
                deskr={image.tags}
                key={image.id}
                onClick={() => {
                  this.handleImageClick(image.largeImageURL);
                }}
              />
            ))}
        </ImageGallery>
        {length > 0 && length < total && !this.state.isLoading && (
          <Button onClick={this.addPage} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImage={this.state.largeImageURL}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </>
    );
  }
}
export default App;
