import { useEffect, useState } from "react";
import { fetchImg } from "services/api";
import css from "./App.module.css";
import { Loader } from "./Loader/Loader";
import { Searchbar }  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [searchImg, setSearchImg] = useState('');
  const [modal, setModal] = useState({isOpen: false, data: '',});
  const perPage = 12;

useEffect(() => {
  if(!searchImg) return;

  const fetchAllImg = async () => {
    try {
  setIsLoading(true)
  const imageElement = await fetchImg(page, perPage, searchImg);

  setImages(prevState => page === 1 ? imageElement.hits : [...prevState, ...imageElement.hits]);
  setLoadMore(page < Math.ceil(imageElement.totalHits / perPage))
} catch (error) {
  console.error(error);
} finally {
  setIsLoading(false);
}}

  fetchAllImg();
}, [searchImg, page])


const handleSubmitForm = searchImg => {
    if (!searchImg) {
      return;
    }

    setSearchImg(searchImg);
    setPage(1);
  }

const onLoadMore = () => {
    setPage(page + 1);
  }


const onOpenModal = (largeImg) => { setModal({isOpen: true, data: largeImg,})}
const onCloseModal = () => { setModal({isOpen: false, data: null,});}

const showImg = Array.isArray(images) && images.length;
    
return (
 <div className={css.App}>
  <Searchbar handleSubmitForm={handleSubmitForm}/>
    {isLoading && <Loader/>}
    <ImageGallery>
  {showImg && images.map(({id, webformatURL, largeImageURL, tag}) => {
  return (
    <ImageGalleryItem
    key={id}
    webformatURL={webformatURL}
    largeImageURL={largeImageURL}
    tag={tag}
    onOpenModal={onOpenModal}
    />)})}
</ImageGallery>
{loadMore && <Button onLoadMore={onLoadMore} showImg={showImg}/>}
{modal.isOpen && <Modal onCloseModal={onCloseModal} data={modal.data}/>}
 </div>
  );
};


