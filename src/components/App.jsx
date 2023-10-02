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
    const { searchQuery, currentPage } = this.state;
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.currentPage;

    // При новому слові запиту, викликаємо функцію нового запиту
    if (prevQuery !== searchQuery || prevPage !== currentPage) {
      this.fetchQuery();
    }
    // Після завантаження нових карток автоматично прокручуємо екран вниз
    // const { images } = this.state;
    // if (images.length > prevState.images.length) {
    //   this.scrolling();
    // }
  }
  // Функція обробки форми з пошуковим запитом
  searchSubmit = searchQuery => {
    this.setState({
      searchQuery,
      currentPage: 1,
      images: [],
      totalHits: 0,
    });
  };
  // Функція зміни номеру сторінки після натискання кнопки Load more
  addPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  // Функція отримання інформації з backend при новому пошуковому запиті
  fetchQuery = async newQuery => {
    const { searchQuery, currentPage } = this.state;
    try {
      //Показуємо loader
      this.setState({ isLoading: true });
      // Викликаємо функцію http запиту
      const data = await fetchImages(searchQuery, currentPage);
      // Якщо отримаємо порожній масив, просимо ввести валідний пошуковий запит
      if (data.hits.length === 0) {
        toast.error('Enter valid search query');
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
        error: null,
      }));
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

  // Функція прокручування вмісту екрану до кнопки load more, якщо вона показана, або до кінця галереї
  // scrolling = () => {
  //   const btnLoadMore = document.querySelector('#loadMore');
  //   if (btnLoadMore) {
  //     btnLoadMore.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //   }
  //   const lastImage = document.querySelector('#ImageGallery').lastElementChild;
  //   if (!btnLoadMore) {
  //     lastImage.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //   }
  // };

  // Функція виклику модального вікна
  handleImageClick = largeImageURL => {
    this.setState({ isModal: true, largeImageURL });
  };
  // Функція закриття модального вікна
  handleCloseModal = () => {
    this.setState({ isModal: false, largeImageURL: '' });
  };

  render() {
    const { images, totalHits, isLoading, isModal, largeImageURL } = this.state;
    const isButtonShow = images.length !== totalHits && !isLoading;
    return (
      <>
        <Searchbar handleSubmit={this.searchSubmit} />
        <ImageGallery>
          {images.length > 0 &&
            images.map(image => (
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
        {isButtonShow && <Button onClick={this.addPage} />}
        {isLoading && <Loader />}
        {isModal && (
          <Modal onClose={this.handleCloseModal} largeImage={largeImageURL} />
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
