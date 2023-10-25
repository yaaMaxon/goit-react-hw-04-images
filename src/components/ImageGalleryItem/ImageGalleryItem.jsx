import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({webformatURL, largeImageURL, tag, onOpenModal}) => {
    return (
<li className={css.ImageGalleryItem} onClick={() => onOpenModal(largeImageURL)}>
   <img 
    className={css.ImageGalleryItem_image}
    src={webformatURL} 
    alt={tag} />
</li>
    )
}
