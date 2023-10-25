import { Component } from "react";
import { fetchImg } from "services/api";
import css from "./App.module.css";
import { Loader } from "./Loader/Loader";
import Searchbar  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import Modal from "./Modal/Modal";

export class App extends Component {
  state = {
    images: null,
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
    totalHits: 0,
    loadMore: true,
    searchImg: '',
    modal: {
      isOpen: false,
      data: '',
    }
  };


 componentDidMount() {
    this.fetchAllImg();
  }

  componentDidUpdate(_, prevState) {
if (
      this.state.searchImg !== prevState.searchImg ||
      this.state.page !== prevState.page
    ) {
      this.fetchAllImg();
    }
  }

  fetchAllImg = async () => {
const {page, perPage, searchImg} = this.state;

try {
  this.setState({
isLoading: true,
  })

  const images = await fetchImg(page, perPage, searchImg);
  // console.log(images)

  this.setState(prevState => ({
    totalHits: images.totalHits,
    images: page === 1 ? images.hits : [...prevState.images, ...images.hits],
    loadMore: page < Math.ceil(images.totalHits / perPage),
  }))
} catch (error) {
  console.error(error);
} finally {

  this.setState({
    isLoading: false,
  })

}

  }

  handleSubmitForm = searchImg => {
    if (!searchImg) {
      return;
    }

    this.setState({
      searchImg,
      page: 1,
    });
  }

  onLoadMore = () => {

  this.setState(prevState => ({
   page: prevState.page + 1, 
    }))

  }


  onOpenModal = (largeImg) => {
    this.setState({
      modal: {
        isOpen: true,
        data: largeImg,
      }
    })
  }

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      }
    })
  }

  render() {

    const showImg = Array.isArray(this.state.images) && this.state.images.length;
    
    return (
      <div className={css.App}>

        <Searchbar handleSubmitForm={this.handleSubmitForm}/>

{this.state.isLoading && <Loader/>}

<ImageGallery>

{showImg && this.state.images.map(({id, webformatURL, largeImageURL, tag}) => {
  return (
    <ImageGalleryItem
    key={id}
    webformatURL={webformatURL}
    largeImageURL={largeImageURL}
    tag={tag}
    onOpenModal={this.onOpenModal}
    />
  )
})}

</ImageGallery>

{this.state.loadMore && 
<Button onLoadMore={this.onLoadMore} showImg={showImg}/>
}

{this.state.modal.isOpen && 
<Modal onCloseModal={this.onCloseModal} data={this.state.modal.data}/>}

      </div>
    );
  }
};


